from fastapi import FastAPI as api
from fastapi.middleware.cors import CORSMiddleware as cors
import requests as rq
import pandas as pd

# import the players dataset
players = pd.DataFrame(rq.get('https://www.rslashfakebaseball.com/api/players').json())

app = api()

app.add_middleware(
    cors, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/players')
async def get_players(team: str):
    players_filtered = players[players['Team'] == team]
    # print(players_filtered)
    print("data:", players_filtered['playerName'].to_list())
    return {"data": players_filtered['playerName'].to_list()}