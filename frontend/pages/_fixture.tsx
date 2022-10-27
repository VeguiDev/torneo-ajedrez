import styles from "../styles/Fixture.module.css";

export function isOdd(n: number) {
  return n % 2;
}

export function Fixture() {
  return (
    <div className={styles["fixture-wrapper"]}>
      <object data="/_graph.svg" type="image/svg+xml"></object>
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
