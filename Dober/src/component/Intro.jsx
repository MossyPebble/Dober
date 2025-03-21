function Intro({ setCurrentComponent }) {
    return (
        <div className="intro">
            <h1>Welcome to Dober!</h1>
            <p>Click the button below to start using the editor.</p>
            <button onClick={() => setCurrentComponent('Editor')}>Start Editing</button>
        </div>
    )
}

export default Intro