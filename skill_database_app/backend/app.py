from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import yaml

app = Flask(__name__)
config = yaml.load(open('database.yaml'))
client = MongoClient(config['uri'])
# db = client.lin_flask
db = client['config']
CORS(app)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/users', methods=['POST', 'GET'])
def data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        Name = body['Name']
        Skill = body['Skill']
        Domain = body['Domain'] 
        Years = body['Years'] 
        Level = body['Level'] 
        # db.users.insert_one({
        db['users'].insert_one({
            "Name": Name,
            "Skill": Skill,
            "Domain":Domain,
            "Years":Years,
            "Level":Level
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'Name': Name,
            'Skill': Skill,
            'Domain':Domain,
            'Years':Years,
            'Level':Level
        })
    
    # GET all data from database
    if request.method == 'GET':
        allData = db['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            Name = data['Name']
            Skill = data['Skill']
            Domain = data['Domain']
            Years = data['Years']
            Level = data['Level']
            dataDict = {
                'id': str(id),
                'Name': Name,
                'Skill': Skill,
                'Domain': Domain,
                'Years': Years,
                'Level': Level
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

@app.route('/users/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = db['users'].find_one({'_id': ObjectId(id)})
        id = data['_id']
        Name = data['Name']
        Skill = data['Skill']
        Domain = data['Domain']
        Years = data['Years']
        Level = data['Level']
        dataDict = {
            'id': str(id),
            'Name': Name,
            'Skill': Skill,
            'Domain':Domain,
            'Years':Years,
            'Level':Level
        }
        print(dataDict)
        return jsonify(dataDict)
        
    # DELETE a data
    if request.method == 'DELETE':
        db['users'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        Name = body['Name']
        Skill = body['Skill']
        Domain = body['Domain']
        Years = body['Years']
        Level = body['Level']

        db['users'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "Name":Name,
                    "Skill":Skill,
                    "Domain": Domain,
                    "Years": Years,
                    "Level": Level
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})

if __name__ == '__main__':
    app.debug = True
    app.run()