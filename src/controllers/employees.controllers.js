import {pool} from '../db.js'

// export const getEmployees = (req, res) => res.send('Obteniendo empleados')
export const getEmployees = async(req, res) => {
    //throw new Error('My error')
    try{
         //throw new Error('DB Error')
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    }catch(err){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getEmployee = async (req, res) => {
    try {
        //throw new Error('DB Error')
        //console.log(req.params.id);
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?',[req.params.id])
        //console.log(rows);
        //res.send('Obteniendo empleado')
        if(rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(rows[0]);   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createEmployee = async(req, res) => {
    try {
      //console.log(req.body);
      const { name, salary } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO employee (name, salary) VALUES (?, ?)",
        [name, salary]
      );
      //res.send({ rows })
      res.send({
        id: rows.insertId,
        name,
        salary,
      });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

//export const deleteEmployee = (req, res) => res.send('Eliminando empleados')
export const deleteEmployee = async (req, res) => {
    try {
        //throw new Error('DB Error')
      const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
        req.params.id,
      ]);
      //console.log(result);
      if (result.affectedRows <= 0)
        return res.status(404).json({
          message: "Employee not found",
        });
      res.sendStatus(204);
      //res.send('Employee deleted');
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


/**Con el metodo PUT en este caso tendriamos que enviar los que queremos actualizar, 
 * por ejemplo el nombre y el salario, podriamos hacer una query en la que solamnete actualicemos ya sea
 * el nombre o el salario, en este caso si solo intentamos actualizar por ejemplo el salario
 * cuando hagamos la peticion, si se actualizara el salario, pero el nombre vendra como null. para ese caso
 * tambien podriamos usar otro metodo que se llama patch, 
 * ejemplo con patch, abajo del de updateEmploye
 */
//export const updateEmployee = (req, res) => res.send('Actualizando empleados')
export const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, salary } = req.body;
      //console.log(id, name, salary);
      const [result] = await pool.query(
        "UPDATE employee SET name = ?, salary = ? WHERE id = ?",
        [name, salary, id]
      );

      //console.log(result);
      if (result.affectedRows === 0)
        return res.status(404).json({
          message: "Employee not found",
        });

      const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
        id,
      ]);
      res.json(rows[0]);
      //res.json(rows)
      //res.json('received')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
    
}

/**Ejemplo con PATCH.
 * Hace lo mismo que el metodo PUT, pero podriamos solamente actualizar uno de los dos datos
 * ya sea nombre o salario
 */
export const updateEmployeePatch = async (req, res) => {
    try {
        const {id} = req.params
        const {name, salary} = req.body
        //console.log(id, name, salary);
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])
    
        //console.log(result);
        if(result.affectedRows === 0)return res.status(404).json({
            message:'Employee not found'
        })
    
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
        //res.json(rows)
        //res.json('received')   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

