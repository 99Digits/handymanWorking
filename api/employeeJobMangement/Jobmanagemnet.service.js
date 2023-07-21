const mysql = require("mysql");
var pool = mysql.createPool({
    host:process.env.host,
    user:process.env.username,
    password:process.env.password,
    database:process.env.DATABASE,
});



module.exports={
    EmpJobMangment:(data,callback)=>{
        pool.query(`INSERT INTO empjob_mangemnt
        (emp_id, work_image_before,
             work_image_after, reached_time,
             job_reject, reject_reason, leaving_time) VALUES (?,?,?,?,?,?,?)`,
             [data.emp_id ,
                data.work_image_before,
                data.work_image_after,
                data.reached_time,
                data.job_reject,
                data.reject_reason,
                data.leaving_time
            ],
            (error, results, fields) => {
                console.log(results);
                if (error) {
                  return callback(error);
                }
                return callback(null, results);
              }
        )
    },

    updateEmpJobMangemnt:(data,callback)=>{
        pool.query(`UPDATE emp_job_mangement SET 
        emp_id=?,
        work_image_before=?,
        work_image_after=?,
        reached_time=?,
        job_assitance=?,
        assi_emp_id=?,
        job_reject=?,
        reject_reason=?,
        transfer_emp_id=?,
        leaving_time=? WHERE job_id='?'`,
        [
            data.emp_id,
            data.work_image_before,
            data.work_image_after,
            data.reached_time,
            data.job_assitance,
            data.assi_emp_id,
            data.job_reject,
            data.reject_reason,
            data.transfer_emp_id,
            data.leaving_time,
            data.job_id
        ],
        (results,error,feilds)=>{
            if(error){
                return callback(error)
            }
            return callback(null,results)
        }
        )
    },
    workerserviceHistory:(id,callback)=>{
        pool.query(`SELECT empjob_mangemnt.emp_id,service_type_slno,emp_firstname,
        service_name_slno,service_type.service_type,
        service_name
        FROM empjob_mangemnt 
        LEFT JOIN service_type on empjob_mangemnt.service_type_slno = service_type.type_slno
        LEFT JOIN service_name on empjob_mangemnt.service_name_slno = service_name.name_slno
        left join emp_creation on empjob_mangemnt.emp_id = emp_creation.emp_id
        where empjob_mangemnt.emp_id =?`,[id],
        (results,error,feilds)=>{
            if(error){
                return callback(error)
            }
            return callback(null,results)
        }
        )
    }
}