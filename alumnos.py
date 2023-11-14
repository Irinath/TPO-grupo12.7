import mysql.connector

class Alumno:
    def __init__(self, host, user, password, database):
          self.conn = mysql.connector.connect( #conn es el nombre de la variable que almacena la conexion puede llamarse de cualquier forma no es necesario conn
            host=host,
            user=user,
            password=password,
            database=database
        )
          self.c = self.conn.cursor(dictionary=True) #creando un objeto cursor c
          self.c.execute("""
         CREATE TABLE IF NOT EXISTS alumno (
                idalumno INT(11) AUTO_INCREMENT PRIMARY KEY,
                nombres VARCHAR(100) NOT NULL,
                apellidos VARCHAR(50) NOT NULL,
                mail VARCHAR(100) NOT NULL,
                idcurso INT(11),
                tipodocumento VARCHAR(15) NOT NULL,
                nrodocumento INT(11) NOT NULL,
                usuario VARCHAR(100) DEFAULT NULL,
                contrasenia VARCHAR(100) DEFAULT NULL,
                activo TINYINT(4) DEFAULT NULL,
                FOREIGN KEY (idcurso) REFERENCES curso (idcurso)
               
            )
        """)
          self.conn.commit()
         

    # -------------------------------------------------------------------
    # Funcion que añade un alumno
    # -------------------------------------------------------------------
    def agregar_alumno(self, id, nom, ape, mail, idcurso, tipo_documento, nro_documento, usuario=None, contrasenia=None, activo=None):
        self.c.execute(f"SELECT * FROM alumno WHERE idalumno = {id}")
        existing_student = self.c.fetchone()
        if existing_student:
            return False

        sql = f"INSERT INTO alumno \
            (idalumno, nombres, apellidos, mail, idcurso, tipodocumento, nrodocumento, usuario, contrasenia, activo) \
            VALUES \
            ({id}, '{nom}', '{ape}', '{mail}', {idcurso}, '{tipo_documento}', {nro_documento}, '{usuario}', '{contrasenia}', {activo})"
        self.c.execute(sql)
        self.conn.commit()
        return True



  # -------------------------------------------------------------------
    # Funcion que devuelve los datos de un alumno
    # -------------------------------------------------------------------    
   
    def consultar_alumno(self, id):
        self.c.execute(f"""
        SELECT alumno.*, curso.nombre_curso as nombre_curso
        FROM alumno
        LEFT JOIN curso as curso ON alumno.idcurso = curso.idcurso
        WHERE alumno.idalumno = {id}
        """)
        
        alumno_data = self.c.fetchone()

        if alumno_data:
            print(f"Datos del alumno con ID {id}:")
            print(f"ID: {alumno_data['idalumno']}")
            print(f"Nombres: {alumno_data['nombres']}")
            print(f"Apellidos: {alumno_data['apellidos']}")
            print(f"Mail: {alumno_data['mail']}")
            print(f"Curso: {alumno_data['nombre_curso']}")
            print(f"Tipo de Documento: {alumno_data['tipodocumento']}")
            print(f"Nro de Documento: {alumno_data['nrodocumento']}")
            print(f"Usuario: {alumno_data['usuario']}")
            print(f"Activo: {alumno_data['activo']}")
            
        else:
            print(f"No se encontró un alumno con ID {id}")

        return alumno_data

        
# -------------------------------------------------------------------
    # Modificar alumno
    # -------------------------------------------------------------------
    def modificar_alumno(self, id, nuevo_nombres, nuevo_apellidos, nuevo_mail, nuevo_idcurso, nuevo_tipo_documento=None, nuevo_nro_documento=None, nuevo_usuario=None, nueva_contrasenia=None, nuevo_activo=None):
        self.c.execute(f"""
            UPDATE alumno
                SET nombres = '{nuevo_nombres}', apellidos = '{nuevo_apellidos}', mail = '{nuevo_mail}',\
                        idcurso = '{nuevo_idcurso}', tipodocumento = '{nuevo_tipo_documento}', \
                        nrodocumento = '{nuevo_nro_documento}', usuario = '{nuevo_usuario}', \
                        contrasenia = '{nueva_contrasenia}, activo = '{nuevo_activo}'
                WHERE idalumno = '{id}'
            """)

        self.conn.commit()
        return self.c.rowcount > 0



# ------------------------------------------------------------------
#   Funcion lista de alumnos
# -------------------------------------------------------------------
    def listar_alumno(self):
     self.c.execute("""
        SELECT alumno.*, curso.nombre_curso as nombre_curso
        FROM alumno
        LEFT JOIN cursos as curso ON alumno.idcurso = curso.idcurso
    """)
     students = self.c.fetchall()
     print("-" * 50)
     for student in students:
        print(f"   Alumno_id: {student['idalumno']}")
        print(f"      Nombres: {student['nombres']}")
        print(f"    Apellidos: {student['apellidos']}")
        print(f"         Mail: {student['mail']}")
        print(f"        Curso: {student['nombre_curso']}")
        print(f"   Tipo Doc.: {student['tipodocumento']}")
        print(f"   Nro. Doc.: {student['nrodocumento']}")
        print(f"    Usuario: {student['usuario']}")
        print(f"  Contraseña: {student['contrasenia']}")
        print(f"      Activo: {student['activo']}")
        print("-" * 50)

# ------------------------------------------------------------------
#   Funcion eliminar un alumno
# -------------------------------------------------------------------
    def eliminar_alumno(self,id):
        self.c.execute(f"DELETE FROM alumno WHERE idalumno = {id}")
        self.conn.commit()
        return  self.c.rowcount>0
        
# ------------------------------------------------------------------
#   Funcion que muestra un alumno
# -------------------------------------------------------------------
    def mostrar_alumno(self, cod):
     student = self.consultar_alumno(cod)

     if student:
        print("-" * 30)
        print(f"             Alumno_id: {student['idalumno']}")
        print(f"                Nombres: {student['nombres']}")
        print(f"              Apellidos: {student['apellidos']}")
        print(f"                  Mail: {student['mail']}")
        print(f"                 Curso: {student['nombre_curso']}")
        print(f"        Tipo Documento: {student['tipodocumento']}")
        print(f"        Nro. Documento: {student['nrodocumento']}")
        print(f"               Usuario: {student['usuario']}")
        print(f"            Contraseña: {student['contrasenia']}")
        print(f"                Activo: {student['activo']}")
        print("-" * 30)
     else:
        print("Alumno no encontrado")

        
alumno=Alumno( host="localhost", user="root", password="", database="free_academy")
# 
alumno.agregar_alumno(6, "Jan", "Brown", "jan@gmail.com", 1, "DNI", 25678898, "janbro", "1234",1)

# alumno.mostrar_alumno(1)

# alumno.modificar_alumno(4,"Pam", "Pez", "panmpez@gmail.com", "none", 1)

# alumno.eliminar_alumno(4)
# alumno.consultar_alumno(4)



