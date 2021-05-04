import os
from flask import Flask, render_template, jsonify, request, send_from_directory
import requests
import json
from crawling import currently_being_screened, works_to_be_screend
from search import get_search_result

app = Flask(__name__)

currently_being_screened()
works_to_be_screend()

@app.route('/')
def initpage():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/search', methods=['GET'])
def view_result():
    query_receive = request.args.get('query')

    movie_list = get_search_result(query_receive)
    
    return jsonify({ 'list': movie_list })

@app.route('/being-screen', methods=['GET'])
def current():
    with open('movie-data/currently-being-screen.json', 'r', encoding='utf-8') as f:
        cur_screen = json.load(f)
        
    return jsonify({ 'list': cur_screen })

@app.route('/to-be-screen', methods=['GET'])
def works():
    with open('movie-data/works-to-be-screend.json', 'r', encoding='utf-8') as f:
        works_screen = json.load(f)
        
    return jsonify({ 'list': works_screen })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
