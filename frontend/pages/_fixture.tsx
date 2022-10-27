import styles from "../styles/Fixture.module.css";
import React, { useEffect } from "react";

import * as d3 from "d3";

export function isOdd(n: number) {
  return n % 2;
}

const treeData = {
  name: "test",
  children: [
    {
      name: "test -1"
    },
    {
      name: "test -2"
    }
  ]
}

function Tree(data: any) {

  var path,
    id = Array.isArray(data) ? (d: any) => d.id : null,
    parentId = Array.isArray(data) ? (d: any) => d.parentId : null,
    children,
    tree = d3.tree,
    separation = tree === d3.tree ? (a: any, b: any) => (a.parent == b.parent ? 1 : 2) / a.depth : (a: any, b: any) => a.parent == b.parent ? 1 : 2,
    sort,
    label = (d: any) => d.name,
    title = (d: any, n: any) => `${n.ancestors().reverse().map((d: any) => d.data.name).join(".")}`,
    link = (d: any, n: any) => `https://github.com/prefuse/Flare/${n.children ? "tree" : "blob"}/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}${n.children ? "" : ".as"}`,
    linkTarget = "_blank",
    width = 640,
    height = 400,
    margin = 60,
    marginTop = margin,
    marginRight = margin,
    marginBottom = margin,
    marginLeft = margin,
    radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2, // outer radius
    r = 3,
    padding = 1,
    fill = "#999",
    fillOpacity,
    stroke = "#555",
    strokeWidth = 1.5,
    strokeOpacity = 0.4,
    strokeLinejoin,
    strokeLinecap,
    halo = "#fff",
    haloWidth = 3

  const root = path != null ? d3.stratify().path(path)(data)
    : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
      : d3.hierarchy(data, children);

  if (sort != null) root.sort(sort);

  const descendants = root.descendants();
  const L = label == null ? null : descendants.map(d => label(d.data, d));

  tree().size([2 * Math.PI, radius]).separation(separation)(root);

  const svg = d3.create("svg")
    .attr("viewBox", [-marginLeft - radius, -marginTop - radius, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

  svg.append("g")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-opacity", strokeOpacity)
    // .attr("stroke-linecap", strokeLinecap)
    // .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", strokeWidth)
    .selectAll("path")
    .data(root.links())
    .join("path")
  .attr("d", d3.linkRadial()
    .angle(d => d.x)
    .radius(d => d.y));

  const node = svg.append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
    .attr("xlink:href", link == null ? null : d => link(d.data, d))
    .attr("target", link == null ? null : linkTarget)
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

  node.append("circle")
    .attr("fill", d => d.children ? stroke : fill)
    .attr("r", r);

  if (title != null) node.append("title")
    .text(d => title(d.data, d));

  if (L) node.append("text")
    .attr("transform", d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
    .attr("dy", "0.32em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("paint-order", "stroke")
    .attr("stroke", halo)
    .attr("stroke-width", haloWidth)
    .text((d, i) => L[i]);

  return svg.node();
}

export function Fixture() {

  const fixtureContRef = React.createRef<HTMLElement>();

  useEffect(() => {
    let tree = Tree(treeData);

    if(fixtureContRef.current) {
      fixtureContRef.current.innerHTML = " ";
      fixtureContRef.current.appendChild(tree);
    }

  }, [])
  
  return (
    <div ref={fixtureContRef} className={styles["fixture-wrapper"]}>
      
    </div>
  );
}

// export function FixtureTree(props:{
//     players:number
// }) {

//     let children = [];

//     for(let i = 0; i > props.players; i++) {
//         if(isOdd(i+1)) {

//             children.push(<FixtureRound players={2}></FixtureRound>);

//         }
//     }

//     return (
//         <>{children}</>
//     );

// }

// export function FixtureRound(props:{
//     players:number
// }) {

//     let children = [];

//     for(let i = 0; i < props.players; i++) {
//         children.push(<FixturePlayer></FixturePlayer>)
//     }

//     return (
//         <div className={styles["round"]}>
//             {children}
//         </div>
//     );

// }

// export function FixturePlayer() {

//     return (
//         <div className={styles["player"]}>

//         </div>
//     );

// }
