import * as THREE from 'three';

export class Network {
    constructor(scene) {
        this.scene = scene;
        this.nodes = [];
        this.connections = [];
        this.agents = [];
        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.init();
    }

    init() {
        this.createNodes();
        this.createConnections();
        this.createAgents();
    }

    createNodes() {
        // Create glowing nodes
        const geometry = new THREE.IcosahedronGeometry(0.5, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        for (let i = 0; i < 30; i++) {
            const node = new THREE.Mesh(geometry, material);

            // Distributed in a cloud
            node.position.x = (Math.random() - 0.5) * 20;
            node.position.y = (Math.random() - 0.5) * 10;
            node.position.z = (Math.random() - 0.5) * 10;

            node.scale.setScalar(Math.random() * 0.5 + 0.2);

            // Visualization data
            node.userData = {
                id: i,
                connections: []
            };

            this.nodes.push(node);
            this.group.add(node);
        }
    }

    createConnections() {
        // Connect nearby nodes
        const material = new THREE.LineBasicMaterial({
            color: 0x00f2ea,
            transparent: true,
            opacity: 0.2
        });

        const positions = [];
        const maxDistance = 8;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];
                const dist = nodeA.position.distanceTo(nodeB.position);

                if (dist < maxDistance) {
                    positions.push(
                        nodeA.position.x, nodeA.position.y, nodeA.position.z,
                        nodeB.position.x, nodeB.position.y, nodeB.position.z
                    );

                    // Store connection for agent pathfinding
                    nodeA.userData.connections.push(nodeB);
                    nodeB.userData.connections.push(nodeA);
                }
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        this.lines = new THREE.LineSegments(geometry, material);
        this.group.add(this.lines);
    }

    createAgents() {
        // Small particles moving along lines
        const geometry = new THREE.SphereGeometry(0.15, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0x00f2ea });

        for (let i = 0; i < 10; i++) {
            const agent = new THREE.Mesh(geometry, material);
            const startNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];

            agent.position.copy(startNode.position);
            agent.userData = {
                currentNode: startNode,
                targetNode: null,
                progress: 0,
                speed: 0.02 + Math.random() * 0.03
            };

            this.agents.push(agent);
            this.group.add(agent);
        }
    }

    animate() {
        // Float the whole group slightly
        this.group.rotation.y += 0.001;

        // Move Agents
        this.agents.forEach(agent => {
            const data = agent.userData;

            if (!data.targetNode) {
                // Find new target
                const connections = data.currentNode.userData.connections;
                if (connections.length > 0) {
                    data.targetNode = connections[Math.floor(Math.random() * connections.length)];
                    data.progress = 0;
                }
            } else {
                // Move towards target
                data.progress += data.speed;

                if (data.progress >= 1) {
                    // Reached
                    data.currentNode = data.targetNode;
                    data.targetNode = null;
                    agent.position.copy(data.currentNode.position);
                } else {
                    // Lerp
                    agent.position.lerpVectors(data.currentNode.position, data.targetNode.position, data.progress);
                }
            }
        });
    }
}
