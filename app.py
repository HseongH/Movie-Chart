from flask import Flask, render_template, jsonify, request, send_from_directory
import requests
import json
from crawling import currently_being_screened, works_to_be_screend
from get-movie-list import get-movie-list

app = Flask(__name__)

currently_being_screened()
works_to_be_screend()

@app.route('/')
def homework():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def view_result():
    query_receive = request.args.get('query')

    movie_list = get_movie_list(query_receive)
    
    return jsonify({ 'list': movie_list })

@app.route('/current', methods=['GET'])
def current():
    with open('currently-being-screen.json', 'r', encoding='utf-8') as f:
        cur_screen = json.load(f)
        
    return jsonify({ 'list': cur_screen })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
