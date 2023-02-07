import './index.css'

function Input(props) {
    let {searchStr, setsearchStr} = props;
    return (
        <div className="input-container">
            <input placeholder="Search by Name" onChange={(e) => setsearchStr(e.target.value)} value={searchStr}></input>
        </div>
    )
}

export default Input;