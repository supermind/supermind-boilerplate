import Inferno from 'inferno'
// import { connectToStyles } from 'styletron-inferno'

function App({ children }) {
  // return <h1 className={styles.header}>{title}</h1>
  return (
    <div>
      <h1>{'App'}</h1>
      {children}
    </div>
  )
}

// const hoc = connectToStyles(props => ({
//   header: {
//     'color': props.color,
//     'filter': 'grayscale(50%)',
//     ':hover': {
//       color: 'blue'
//     },
//     '@media (max-width: 800px)': {
//       color: 'green'
//     }
//   }
// }))

// export default hoc(App)
export default App
