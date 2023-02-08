import './index.css'

function TestScores(props) {
    const {item} = props
    return (
        item.grades.map((item, idx) => {
            return <p>Test {idx+1}: {item}</p>
        })
    )
}

export default TestScores;