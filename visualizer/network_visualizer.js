sigma.utils.pkg('sigma.canvas.nodes');

function Node(id, label, photo, color, x = 0, y = 0) {
    this.id = id;
    this.label = label;
    this.image = {
        url: photo,
        scale: 1.3,
        clip: 0.95
    };
    this.x = x;
    this.y = y;
    this.size = 8;
    this.type = "circle";
    this.color = "#" + color;
    this.originalColor = "#" + color;
    this.position = "absolute";
}

function Edge(id, source, target, color) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.color = "#" + color;
    this.originalColor = "#" + color;
}
var nodes = [];
var edges = [];
var network;
var friend_color = "535693"
var subject_color = "52A758"
var red_color = "535693"
var yellow_color = "D4B869"

function add_friends(node, s) {
    $.getJSON('https://still-falls-98852.herokuapp.com/users/' + node.id + '.json', function(data) {
        var Fid = data.id;
        $.each(data.friendships, function(k, v) {
            $.getJSON('https://still-falls-98852.herokuapp.com/users/' + v.friend_id + '.json', function(data) {
                x = Math.floor(Math.random() * 10) + 1;
                y = Math.floor(Math.random() * 10) + 1;
                var friend_of_friend = new Node(data.id, (data.first_name + " " + data.last_name), data.profile_picture, yellow_color, x, y);
                try {
                    s.graph.addNode(friend_of_friend)
                    var link = new Edge(("e" + data.id), Fid, data.id, yellow_color);

                    s.graph.addEdge(link);
                    s.refresh();
                } catch (e) {
                    console.log(e)
                }
            });
        });
    });
}

function create_data(id) {
    $.getJSON('https://still-falls-98852.herokuapp.com/users/' + id + '.json', function(data) {
        var subject = new Node(data.id, (data.first_name + " " + data.last_name), data.profile_picture, subject_color);
        nodes.push(subject);
        $.each(data.friendships, function(k, v) {
            $.getJSON('https://still-falls-98852.herokuapp.com/users/' + v.friend_id + '.json', function(data) {
                var friend = new Node(data.id, (data.first_name + " " + data.last_name), data.profile_picture, friend_color);
                nodes.push(friend);
                var link = new Edge(("e" + data.id), subject.id, data.id, friend_color);
                edges.push(link);
            });
        });

        nodes = nodes.filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        network = {
            "nodes": nodes,
            "edges": edges
        }
    });
}

// Function sourced from: https://github.com/jacomyal/sigma.js/issues/715
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index) {
        neighbors[k] = this.nodesIndex[k];
    }
    return neighbors;
});

$(document).ready(function() {
    var id = Math.floor(Math.random() * 500) + 1
    create_data(id);
    var s;
    setTimeout(function() {
        s = new sigma({
            graph: network,
            renderer: {
                container: document.getElementById('container'),
                type: 'canvas'
            },
            settings: {
                labelThreshold: 30,
                minNodeSize: 8,
                maxNodeSize: 20,
                doubleClickEnabled: false
            }
        });
        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
        dragListener.bind('drop', function(event) {
            event.preventDefault();
            console.log(event);
        });
        CustomShapes.init(s);

    }, 1000);

    setTimeout(function() {
        s.graph.nodes().forEach(function(node, i, a) {
            if (a[i].id != id) {
                add_friends(a[i], s);
            }
        });
    }, 3000);

    setTimeout(function() {
        s.graph.nodes().forEach(function(node, i, a) {
            if (a[i].id != id) {
                node.x = Math.cos(Math.PI * 2 * i / a.length);
                node.y = Math.sin(Math.PI * 2 * i / a.length);
            }
        });

        // Function Sourced From: http://sigmajs.org/#tutorial
        s.bind('clickNode', function(e) {
            var nodeId = e.data.node.id,
                toKeep = s.graph.neighbors(nodeId);
            toKeep[nodeId] = e.data.node;
            s.graph.nodes().forEach(function(n) {
                if (toKeep[n.id]) {
                    n.color = n.originalColor;
                    n.size = 20
                } else {
                    n.color = '#eee';
                    n.size = 10
                }
            });

            s.graph.edges().forEach(function(e) {
                if (toKeep[e.source] && toKeep[e.target]) {
                    e.color = e.originalColor;
                    e.size = 4;
                } else {
                    e.color = '#eee';
                    e.size = 1;
                }

            });
            s.refresh();
        });

        // Function Sourced From: http://sigmajs.org/#tutorial
        s.bind('clickStage', function(e) {
            var opt = $("select").val();

            s.graph.nodes().forEach(function(n) {
                n.color = n.originalColor;
                n.size = 10
                if (opt == 'fof' || opt == "public") {
                    n.hidden = false;
                }

            });

            s.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
                e.size = 1;
                if (opt == 'fof' || opt == "public") {
                    e.hidden = false;
                }
            });
            s.refresh();
        });
    }, 5000);

    $("select").change(function() {
        var option = $(this).val()
        $('#background').css('background-image', 'none');
        $('#background').css('background-size', 'none');
        if (option == "me") {
            s.graph.nodes().forEach(function(n) {
                if (n.id == id) {
                    n.hidden = false;
                } else {
                    n.hidden = true;
                }
            });
        } else if (option == "friend") {
            var toKeep = s.graph.neighbors(id);
            s.graph.nodes().forEach(function(n) {
                if (toKeep[n.id] || n.id == id) {
                    n.hidden = false;
                } else {
                    n.hidden = true;
                }
            });

        } else if (option == "fof") {
            s.graph.nodes().forEach(function(n) {
                n.hidden = false;
            });
        } else {
            s.graph.nodes().forEach(function(n) {
                n.hidden = false;
            });
            $('#background').css('background-image', 'url(world.png)');
            $('#background').css('background-size', 'cover');
        }
        s.refresh();
    });
});
