import mysql.connector


class Alumno:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.c = self.conn.cursor(dictionary=True)

        self.c.execute("""
            CREATE TABLE IF NOT EXISTS alumno (
                idalumno INT(11) AUTO_INCREMENT PRIMARY KEY,
                nombres VARCHAR(100) NOT NULL,
                apellidos VARCHAR(50) NOT NULL,
                mail VARCHAR(100) NOT NULL,
                tipodocumento VARCHAR(15) NOT NULL,
                nrodocumento INT(11) NOT NULL,
                telefono INT(11) NOT NULL,
                activo TINYINT(4) DEFAULT NULL
            )
        """)

        self.conn.commit()
    # -------------------------------------------------------------------
    # Funcion que añade un alumno
    # -------------------------------------------------------------------
    def agregar_alumno(self, id, nom, ape, mail,  tipo_documento, nro_documento, telefono, activo=None):
        self.c.execute(f"SELECT * FROM alumno WHERE idalumno = {id}")
        existing_student = self.c.fetchone()
        if existing_student:
            return False

        sql = f"INSERT INTO alumno \
            (idalumno, nombres, apellidos, mail,  tipodocumento, nrodocumento, telefono, activo) \
            VALUES \
            ({id}, '{nom}', '{ape}', '{mail}', '{tipo_documento}', {nro_documento},  '{telefono}', {activo})"
        self.c.execute(sql)
        self.conn.commit()
        return True



#   # -------------------------------------------------------------------
#     # Funcion que devuelve los datos de un alumno
#     # -------------------------------------------------------------------    
   
    def consultar_alumno(self, id):
        self.c.execute(f"""
            SELECT * FROM alumno
            WHERE idalumno = {id}
        """)

        alumno_data = self.c.fetchone()

        if alumno_data:
            print(f"Datos del alumno con ID {id}:")
            print(f"ID: {alumno_data['idalumno']}")
            print(f"Nombres: {alumno_data['nombres']}")
            print(f"Apellidos: {alumno_data['apellidos']}")
            print(f"Mail: {alumno_data['mail']}")
            print(f"Tipo de Documento: {alumno_data['tipodocumento']}")
            print(f"Nro de Documento: {alumno_data['nrodocumento']}")
            print(f"Teléfono: {alumno_data['telefono']}")
            print(f"Activo: {alumno_data['activo']}")
        else:
            print(f"No se encontró un alumno con ID {id}")

        return alumno_data

        
# -------------------------------------------------------------------
    # Modificar alumno
    # -------------------------------------------------------------------
    def modificar_alumno(self, id, nuevo_nombres, nuevo_apellidos, nuevo_mail,  nuevo_tipo_documento=None, nuevo_nro_documento=None, nuevo_telefono=None, nuevo_activo=None):
        self.c.execute(f"""
            UPDATE alumno
            SET nombres = '{nuevo_nombres}', apellidos = '{nuevo_apellidos}', mail = '{nuevo_mail}',\
                tipodocumento = '{nuevo_tipo_documento}', \
                nrodocumento = '{nuevo_nro_documento}',  \
                telefono = '{nuevo_telefono}', activo = '{nuevo_activo}'
            WHERE idalumno = '{id}'
        """)

        self.conn.commit()
        return self.c.rowcount > 0


# ------------------------------------------------------------------
#   Funcion lista de alumnos
# -------------------------------------------------------------------
    def listar_alumno(self):
     self.c.execute("""
        SELECT *
        FROM alumno
        o
    """)
     students = self.c.fetchall()
     print("-" * 50)
     for student in students:
        print(f"   Alumno_id: {student['idalumno']}")
        print(f"      Nombres: {student['nombres']}")
        print(f"    Apellidos: {student['apellidos']}")
        print(f"         Mail: {student['mail']}")
        print(f"   Tipo Doc.: {student['tipodocumento']}")
        print(f"   Nro. Doc.: {student['nrodocumento']}")
        print(f"  Telefono: {student['telefono']}")
        print(f"      Activo: {student['activo']}")
        print("-" * 50)

# # ------------------------------------------------------------------
#   Funcion eliminar un alumno
# -------------------------------------------------------------------
    def eliminar_alumno(self,id):
        self.c.execute(f"DELETE FROM alumno WHERE idalumno = {id}")
        self.conn.commit()
        return  self.c.rowcount>0
        
# ------------------------------------------------------------------
#   Funcion que muestra un alumno
# -------------------------------------------------------------------
    def mostrar_alumno(self, idalumno):
     student = self.consultar_alumno(idalumno)

     if student:
        print("-" * 30)
        print(f"             Alumno_id: {student['idalumno']}")
        print(f"                Nombres: {student['nombres']}")
        print(f"              Apellidos: {student['apellidos']}")
        print(f"                  Mail: {student['mail']}")
        print(f"        Tipo Documento: {student['tipodocumento']}")
        print(f"        Nro. Documento: {student['nrodocumento']}")
        print(f"            Telefono: {student['telefono']}")
        print(f"                Activo: {student['activo']}")
        print("-" * 30)
     else:
        print("Alumno no encontrado")


alumno=Alumno( host="localhost", user="root", password="", database="free_academy")
# #-------------------------------------------------------------------- 
alumno.agregar_alumno(2, "Jan", "Porez", "jane@gmail.com",  "DNI", 33678898, "janep",1)

alumno.mostrar_alumno(1)

#alumno.modificar_alumno(1,"Pedro", "Ortiz", "pedror@gmail.com", "DNI", 18564777, "1154567734", "1")

#alumno.eliminar_alumno(2)
#alumno.consultar_alumno(1)
#alumno.listar_alumno()



