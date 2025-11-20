from fastapi import FastAPI as api
from fastapi.middleware.cors import CORSMiddleware as cors
import requests as rq
import pandas as pd

app = api()

app.add_middleware(
    cors, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


players = None
player_data = None

def refresh_data():
    global players
    players = pd.DataFrame(rq.get('https://www.rslashfakebaseball.com/api/players').json())

@app.get("/api/refresh")
async def refresh():
    refresh_data()
    return {"status": "ok"}

@app.get('/api/players')
async def get_players(team: str):
    players_filtered = players[(players['Team'] == team) & (players['priPos'] == 'P')]
    # print(players_filtered)
    # print("data:", players_filtered['playerName'].to_list())
    return {"data": players_filtered['playerName'].to_list()}

@app.get('/api/player')
async def get_player_data(name: str):
    global player_data
    player_data = rq.get(f'https://www.rslashfakebaseball.com/api/plateappearances/pitching/league/{name}').json()
    return {'pull success': True}