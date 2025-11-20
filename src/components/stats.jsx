import React from 'react';
import { NavLink } from 'react-router-dom';

export default function stats(playerName) {
    React.useEffect(() => {
            const fetchPlayerData = async () => {
                try {
                    const response = await fetch(`/api/player`);
                    const resp = await response.json();
                    console.log(resp);
                } catch (error) {
                    console.error('Error fetching player data:', error);
                    setTeamPlayers([]);
                    setPlayer('');
                }
            };

    return
}