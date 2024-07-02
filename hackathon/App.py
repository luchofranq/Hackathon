from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración de la base de datos (ajusta según tu configuración)
app.config['MYSQL_HOST'] = '192.168.0.157'
app.config['MYSQL_USER'] = 'remote_user'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'datos'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mediciones', methods=['GET', 'POST'])
def mediciones():
    try:
        cur = mysql.connection.cursor()
        if request.method == 'POST':
            fecha_busqueda = request.form['fechaBusqueda']
            cur.execute('SELECT * FROM report WHERE fecha = %s', [fecha_busqueda])
        else:
            cur.execute('SELECT * FROM report')
        data = cur.fetchall()
        cur.close()
        return render_template('mediciones.html', contacts=data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ultimas-mediciones/paraguay')
def ultimas_mediciones_paraguay():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT temperature, wind_speed, moisture, date, solar_energy FROM report WHERE id_institute = %s ORDER BY id_report DESC LIMIT 1', ['1'])
        data = cur.fetchone()
        cur.close()
        if data:
            resultado = {
                'temperatura': data[0],
                'velocidad': data[1],
                'humedad': data[2],
                'fecha': data[3].strftime('%Y-%m-%d %H:%M:%S'), # Formateo de fecha para JSON
                'energia':data[4]
            }
        else:
            resultado = {'error': 'No se encontraron datos'}
        return jsonify(resultado)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
