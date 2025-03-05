import billboard
import json

def get_hot_100_chart_first_half():
    chart = billboard.ChartData('hot-100')
    return chart[0:50]

def get_hot_100_chart_second_half():
    chart = billboard.ChartData('hot-100')
    return chart[50:100]

if __name__ == "__main__":
    first_half = get_hot_100_chart_first_half()
    second_half = get_hot_100_chart_second_half()

    def serialize(entry):
        return {"title": entry.title, "artist": entry.artist}

    data = {
        "first_half": list(map(serialize, first_half)),
        "second_half": list(map(serialize, second_half))
    }

    # Write the JSON to the public directory so Next.js can serve it
    with open("public/billboard.json", "w") as f:
        json.dump(data, f)
