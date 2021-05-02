import requests
import json

with open('currently-being-screen.json', 'r', encoding='utf-8') as f:
    cur_screen = f.read()

print(cur_screen)