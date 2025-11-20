import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const [team, setTeam] = React.useState('');           // selected team
    const [teamPlayers, setTeamPlayers] = React.useState([]); // fetched players
    const [player, setPlayer] = React.useState('');       // selected player

    const teamSelected = !!team;

    React.useEffect(() => {
        if (!team) {
            setTeamPlayers([]);
            setPlayer('');
            return;
        }

        const fetchPlayers = async () => {
            try {
                const response = await fetch(`/api/players?team=${team}`);
                const data = await response.json();
                console.log('Fetched players:', data);
                setTeamPlayers(data.data || []); // handle empty or missing data
                setPlayer(''); // reset selected player when team changes
            } catch (error) {
                console.error('Error fetching players:', error);
                setTeamPlayers([]);
                setPlayer('');
            }
        };

        fetchPlayers();
    }, [team]);

    return (
        <main className="container-fluid bg-light text-center main">
            <h2>Welcome to Snek Scouting!</h2>
            <p>This is a platform dedicated to scouting and analyzing snake gameplay.</p>

            <div className='team-selection'>
                <label className='select-statement'>Select an MLB team:</label>
                <select
                    id="mlb-teams"
                    name="mlb-teams"
                    value={team}
                    className='team-dropdown dropdown'
                    onChange={(e) => setTeam(e.target.value)}
                >
                    <option value="">--Select a team--</option>
                    <option value="ARI">Arizona Diamondbacks</option>
                    <option value="ATL">Atlanta Braves</option>
                    <option value="BAL">Baltimore Orioles</option>
                    <option value="BOS">Boston Red Sox</option>
                    <option value="CHC">Chicago Cubs</option>
                    <option value="CWS">Chicago White Sox</option>
                    <option value="CIN">Cincinnati Reds</option>
                    <option value="CLE">Cleveland Guardians</option>
                    <option value="COL">Colorado Rockies</option>
                    <option value="DET">Detroit Tigers</option>
                    <option value="HOU">Houston Astros</option>
                    <option value="KC">Kansas City Royals</option>
                    <option value="LAA">Los Angeles Angels</option>
                    <option value="LAD">Los Angeles Dodgers</option>
                    <option value="MIA">Miami Marlins</option>
                    <option value="MIL">Milwaukee Brewers</option>
                    <option value="MIN">Minnesota Twins</option>
                    <option value="NYM">New York Mets</option>
                    <option value="NYY">New York Yankees</option>
                    <option value="OAK">Oakland Athletics</option>
                    <option value="PHI">Philadelphia Phillies</option>
                    <option value="PIT">Pittsburgh Pirates</option>
                    <option value="SD">San Diego Padres</option>
                    <option value="SF">San Francisco Giants</option>
                    <option value="SEA">Seattle Mariners</option>
                    <option value="STL">St. Louis Cardinals</option>
                    <option value="TB">Tampa Bay Rays</option>
                    <option value="TEX">Texas Rangers</option>
                    <option value="TOR">Toronto Blue Jays</option>
                    <option value="WSH">Washington Nationals</option>
                </select>
            </div>

            {teamSelected && (
                <div className='player-list'>
                    <h3>Players on {team}:</h3>

                    {teamPlayers.length > 0 ? (
                        <select
                            id="team-players"
                            name="team-players"
                            value={player}
                            className='player-dropdown dropdown'
                            onChange={(e) => setPlayer(e.target.value)}
                        >
                            <option value="">--Select a player--</option>
                            {teamPlayers.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Loading players...</p>
                    )}
                </div>
            )}
        </main>
    );
}
