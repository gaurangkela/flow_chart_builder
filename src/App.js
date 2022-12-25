import React, { useState } from "react";
import Flowchart from "flowchart-react";

//simple light-weight library for creating flowChart

function App() {
  //input state for changing selected node title
  const [nodeTitle, setNodeTitle] = useState("")

  //selecting any node by doub clicking on it and storing that node's id for updating title
  const [selectedNodeId, setSelectedNodeId] = useState("")

  //sample initial node data to show basic flow chart
  const [nodes, setNodes] = useState([
    {
      type: "start",
      title: "Start",
      x: 50,
      y: 240,
      id: 1604410569920,
    },
    {
      type: "end",
      title: "End",
      x: 570,
      y: 240,
      id: 1604410572363,
    },
    {
      x: 400,
      y: 240,
      id: 1604410575428,
      title: "Joyce",
      type: "operation",
    },
    {
      x: 230,
      y: 240,
      id: 1604410591865,
      title: () => {
        return "Is leader";
      },
      type: "decision",
    },
  ]);

  //for setting connection between nodes
  //sample initial connection data for initial node data
  const [conns, setConns] = useState([
    {
      source: { id: 1604410569920, position: "right" },
      destination: { id: 1604410591865, position: "left" },
      id: 1604410587907,
      type: "success",
    },
    {
      source: { id: 1604410575428, position: "right" },
      destination: { id: 1604410572363, position: "left" },
      id: 1604410590524,
      type: "success",
    },
    {
      source: { id: 1604410591865, position: "right" },
      destination: { id: 1604410575428, position: "left" },
      id: 1604410590524,
      type: "fail",
    },
    {
      source: { id: 1604410591865, position: "bottom" },
      destination: { id: 1604410572363, position: "bottom" },
      id: 1604410590524,
      type: "success",
    },
  ]);

  //on double clicking out side nodes, it will create new node
  //first it will checkout weather start and stop type nodes are there or not? if it is node there then it will create
  //start or stop node which is not there
  //if start and stop nodes are there then it will create default rectangular new node
  //it will set title of new rectangular node if we have added in node name text box otherwise blank will be there as title

  const handleCreateNode = (event, zoom) => {
    const point = {
      x: event.nativeEvent.offsetX / zoom,
      y: event.nativeEvent.offsetY / zoom,
      id: +new Date()
    };
    let nodeData;
    if (!nodes.find((item) => item.type === "start")) {
      nodeData = {
        type: "start",
        title: "Start",
        ...point
      };
    } else if (!nodes.find((item) => item.type === "end")) {
      nodeData = {
        type: "end",
        title: "End",
        ...point
      };
    } else {
      console.log("nodeTitle", nodeTitle)
      nodeData = {
        ...point,
        title: nodeTitle,
        type: "operation"
      };
    }
    setNodes((prevState) => [...prevState, nodeData]);
  }

  //for updating node title it will findout which node has been selected and finds its index from the node array
  //if found then it will update
  const UpdateNodeTitle = () => {
    let index = nodes.findIndex(item => item.id === selectedNodeId)
    // console.log(index)
    if (index > -1) {
      let tempNodes = [...nodes]
      tempNodes[index].title = nodeTitle;
      setNodes(tempNodes)
      setNodeTitle("")
      setSelectedNodeId("")
    }
  }

  //this library doesn't let you change title by selecting it or while creating new node
  // so i have added my custom logic for updating title of any node
  //we just have to select the node by double clicking it
  //we can also create new node by double clicking outside ant node
  // we can create round, rectangular and diamond shape by drag and drop from left panel which is provided by default from library
  return (
    <>
      <Flowchart
        onChange={(nodes, connections) => {
          setNodes(nodes);
          setConns(connections);
        }}
        onDoubleClick={handleCreateNode}
        onNodeDoubleClick={(node) => {
          console.log(node)
          setSelectedNodeId(node.id)
        }}
        style={{ width: 800, height: 600 }}
        nodes={nodes}
        connections={conns}
      />

      <input type="text" placeholder="Node Name"
        onChange={(e) => setNodeTitle(e.target.value)}
        style={{ margin: "25px", border: '1px solid black' }}
        value={nodeTitle} />

      <button onClick={UpdateNodeTitle} style={{ margin: "25px", backgroundColor: 'gray' }} >Update Node Name</button>
    </>

  );
};

export default App;
