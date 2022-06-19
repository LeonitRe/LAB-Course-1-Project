using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TrainerRegister.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace TrainerRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public TrainerController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select TrainerId, TrainerName, TrainerUsername, Email, EmailPrivat, PhoneNumber, convert(varchar(10),DateOfBirth,120) as DateOfBirth, Gender, City, Nationality, Address, AgeGroups, convert(varchar(10),DateOfJoining,120) as DateOfJoining, PhotoFileName
                            from
                            dbo.Trainer
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerRegisterAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Trainer tra)
        {
            string query = @"
                           insert into dbo.Trainer
                           (TrainerName, TrainerUsername, Email, EmailPrivat, PhoneNumber, DateOfBirth, Gender, City, Nationality, Address, AgeGroups, DateOfJoining, PhotoFileName)
                    values (@TrainerName, @TrainerUsername, @Email, @EmailPrivat, @PhoneNumber, @DateOfBirth, @Gender, @City, @Nationality, @Address, @AgeGroups, @DateOfJoining, @PhotoFileName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerRegisterAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TrainerName", tra.TrainerName);
                    myCommand.Parameters.AddWithValue("@TrainerUsername", tra.TrainerUsername);
                    myCommand.Parameters.AddWithValue("@Email", tra.Email);
                    myCommand.Parameters.AddWithValue("@EmailPrivat", tra.EmailPrivat);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", tra.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", tra.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@Gender", tra.Gender);
                    myCommand.Parameters.AddWithValue("@City", tra.City);
                    myCommand.Parameters.AddWithValue("@Nationality", tra.Nationality);
                    myCommand.Parameters.AddWithValue("@Address", tra.Address);
                    myCommand.Parameters.AddWithValue("@AgeGroups", tra.AgeGroups);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", tra.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", tra.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Trainer tra)
        {
            string query = @"
                           update dbo.Trainer
                           set TrainerName= @TrainerName,
                            TrainerUsername=@TrainerUsername,
                            Email=@Email,
                            EmailPrivat=@EmailPrivat,
                            PhoneNumber=@PhoneNumber,
                            DateOfBirth=@DateOfBirth,
                            Gender=@Gender,
                            City=@City,
                            Nationality=@Nationality,
                            Address=@Address,
                            AgeGroups=@AgeGroups,
                            DateOfJoining=@DateOfJoining,
                            PhotoFileName=@PhotoFileName
                            where TrainerId=@TrainerId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerRegisterAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TrainerName", tra.TrainerName);
                    myCommand.Parameters.AddWithValue("@TrainerUsername", tra.TrainerUsername);
                    myCommand.Parameters.AddWithValue("@Email", tra.Email);
                    myCommand.Parameters.AddWithValue("@EmailPrivat", tra.EmailPrivat);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", tra.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", tra.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@Gender", tra.Gender);
                    myCommand.Parameters.AddWithValue("@City", tra.City);
                    myCommand.Parameters.AddWithValue("@City", tra.Nationality);
                    myCommand.Parameters.AddWithValue("@Address", tra.Address);
                    myCommand.Parameters.AddWithValue("@AgeGroups", tra.AgeGroups);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", tra.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", tra.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Trainer
                            where TrainerId=@TrainerId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerRegisterAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TrainerId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.PNG");
            }
        }
    }
}
