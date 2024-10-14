const getPerson = (conn, req, res) =>{
	const params = req.body;
	const ret = {
		data: {
			page: params.page,
			limit: params.limit,
			total: null,
			data: null,
		}
	}
	let sql;
	// if(params.conditions.name) sql = `SELECT * FROM t_person ${params.conditions.name ? 'WHERE'} WHERE name=${req.body.conditions.name} LIMIT ${(params.page - 1)*params.limit},${params.limit}`;
	sql = `SELECT * FROM t_person ${objTostr(params.conditions,' AND ').length > 0 ? 'WHERE ' +  objTostr(params.conditions,' AND '): ''} LIMIT ${(params.page - 1)*params.limit},${ params.limit}`;
	console.log(sql);
	conn.query(`SELECT COUNT(*) FROM t_person ${objTostr(params.conditions,' AND ').length > 0 ? 'WHERE ' +  objTostr(params.conditions,' AND '): ''}`,(error, results, fields) =>{
		// console.log(results);
		// console.log(`SELECT COUNT(*) FROM t_person ${objTostr(params.conditions,' AND ').length > 0 ? 'WHERE ' +  objTostr(params.conditions,' AND '): ''} LIMIT ${(params.page - 1)*params.limit},${ params.limit}`);
		ret.data.total = results[0]['COUNT(*)']
	})
	conn.query(sql,
	    function (error, results, fields) {
			console.log(fields);
	    if (error) {
	        ret.code = 500
	        ret.data = null
	        ret.msg = error.sqlMessage
	        return
	    }
	    if (results.length === 0) {
	        ret.code = 501
	        ret.message = 'Please pass the correct parameters'
	    } else {
	        ret.code = 200
	        ret.data.data = results
	        ret.msg = 'Query successful!'
	    }
	    res.json(ret)
	})
}


const addPerson = (conn, req, res) => {
    const params = req.body
	console.log(params);
		console.log(typeof params.age);
    // console.log(params);
    const ret = {}
    if (!params.name || params.name == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please enter your name'
        res.json(ret)
        return
    } else if (!params.age || params.name == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please enter the correct age'
        res.json(ret)
        return
    } else {
        conn.query(`INSERT INTO t_person(name,age,school,id)VALUES('${params.name || ""}','${params.age || ""}','${params.school || ""}','${randomId()}')`,
        // conn.query(`INSERT INTO t_person(name,age,school)VALUES('${params.name}','${params.age}','${params.school}')`,
            function (error, results, fields) {
            if (error) {
                ret.code = 500
                ret.data = null
                ret.msg = error.sqlMessage
                return
            }
            if (results.length === 0) {
                ret.code = 501
                ret.message = 'Please pass the correct parameters'
            } else {
                ret.code = 200
                ret.data = null
                ret.msg = 'Added successfully'
            }
            res.json(ret)
        })
    }
}

const randomId = function uuid(){
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });		
}

const objTostr = function (conditions,symbol) {  
  let parts = [];  
 
  for (let key in conditions) {  
  
    if (conditions[key]) {  

      parts.push(`${key} LIKE '%${conditions[key]}%'`);  
    }  
  }  
 
  if (parts.length === 0) {  
    return '';  
  }  
 
  return parts.join(symbol);  
}

const updatePerson = (conn, req, res) => {
    const params = req.body
    // console.log(params);
    const ret = {}
    if (params.name == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please provide your name'
        res.json(ret)
        return
    } else if (params.age == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please enter your name'
        res.json(ret)
        return
    } else if (params.school == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please enter the school'
        res.json(ret)
        return
    } else {
        conn.query(`UPDATE t_person SET 
        name="${params.name}",
        age="${params.age}",
        school="${params.school}" WHERE id="${params.id}";`,
            function (error, results, fields) {
                if (error) {
                    ret.code = 500
                    ret.data = null
                    ret.msg = error.sqlMessage
                    return
                }
                if (results.length === 0) {
                    ret.code = 501
                    ret.message = 'Please pass the correct parameters'
                } else {
                    ret.code = 200
                    ret.data = null
                    ret.msg = 'Modified successfully'
                }
                res.json(ret)
            })
    }
}

const deletePerson = (conn, req, res) => {
    console.log(req.query);
    const params = req.query;
    const ret = {}
    if (params.id == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please provide the ID'
        res.json(ret)
        return
    } else { 
		let sql = `DELETE FROM t_person WHERE id="${params.id}"`;
        conn.query(sql,
            function (error, results, fields) {
                // console.log(error);
                if (error) {
                    ret.code = 500
                    ret.data = null
                    ret.msg = error.sqlMessage
                    return
                }
                if (results.length === 0) {
                    ret.code = 501
                    ret.message = 'Please pass the correct parameters'
                } else {
                    ret.code = 200
                    ret.data = null
                    ret.msg = 'Delete successfully'
                }
                res.json(ret)
            })
    }
}

const detailPerson = (conn, req, res) => {
    console.log(req.query);
    const params = req.query;
    const ret = {}
    if (params.id == '') {
        ret.code = 501
        ret.data = null
        ret.msg = 'Please provide the ID'
        res.json(ret)
        return
    } else { 
        conn.query(`SELECT * FROM t_person WHERE id="${params.id}";`,
            function (error, results, fields) {
                // console.log(error);
                if (error) {
                    ret.code = 500
                    ret.data = null
                    ret.msg = error.sqlMessage
                    return
                }
                if (results.length === 0) {
                    ret.code = 501
                    ret.message = 'Please pass the correct parameters!'
                } else {
                    ret.code = 200
                    ret.data = results[0]
                    ret.msg = 'Query successful!'
                }
                res.json(ret)
            })
    }
}

module.exports = {
	getPerson,
	updatePerson,
	addPerson,
	deletePerson,
	deletePerson,
}
