from flask import Flask, jsonify
from flask_cors import CORS
import billboard

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/billboard', methods=['GET'])
def get_billboard():
    chart = billboard.ChartData('hot-100')
    entries = [{
        "rank": entry.rank,
        "title": entry.title,
        "artist": entry.artist,
        "weeks": entry.weeks
    } for entry in chart]
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)
