export const Leaderboard = ({setModal}) => {
    return (
        <div className="modal" style={{position: "absolute", width: "20%", height:"20%", background: "yellow"}}
        onBlur={() => setModal({leaderboard: false, help: false, settings: false, profile: false})}
        tabIndex={-1}>
            Leaderboard
        </div>
    )
}

export const Help = ({setModal}) => {
    return (
        <div className="modal" style={{position: "absolute", width: "20%", height:"20%", background: "yellow"}}
        onBlur={() => setModal({leaderboard: false, help: false, settings: false, profile: false})}
        tabIndex={-1}>
            Help
        </div>
    )
}

export const Profile = ({setModal}) => {
    return (
        <div className="modal" style={{position: "absolute", width: "20%", height:"20%", background: "yellow"}}
        onBlur={() => setModal({leaderboard: false, help: false, settings: false, profile: false})}
        tabIndex={-1}>
            Profile
        </div>
    )
}

export const Settings = ({setModal}) => {
    return (
        <div className="modal" style={{position: "absolute", width: "20%", height:"20%", background: "yellow"}}
        onBlur={() => setModal({leaderboard: false, help: false, settings: false, profile: false})}
        tabIndex={-1}>
            Settings
        </div>
    )
}