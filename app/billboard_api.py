from flask import Flask, jsonify
import billboard

app = Flask(__name__)

@app.route('/billboard', methods=['GET'])
def get_billboard():
    # Fetch the current Hot 100 chart using billboard.py
    chart = billboard.ChartData('hot-100')
    # Create a list of dictionaries for each entry
    entries = [{
        "rank": entry.rank,
        "title": entry.title,
        "artist": entry.artist,
        "weeks": entry.weeks
    } for entry in chart]
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)
