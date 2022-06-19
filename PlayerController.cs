using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PlayerRegisterCrud.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace PlayerRegisterCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PlayerController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }



        [HttpGet]
            public JsonResult Get()
            {
                string query = @"
                            select PlayerId, PlayerName, PlayerUsername, Email, EmailPrivat, PhoneNumber, convert(varchar(10),DateOfBirth,120) as DateOfBirth, Gender, City, Nationality, Address, AgeGroups, convert(varchar(10),DateOfJoining,120) as DateOfJoining, PhotoFileName
                            from
                            dbo.Player
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PlayerRegisterAppCon");
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
            public JsonResult Post(Player plr)
            {
                string query = @"
                           insert into dbo.Player
                           (PlayerName, PlayerUsername, Email, EmailPrivat, PhoneNumber, DateOfBirth, Gender, City, Nationality, Address, AgeGroups, DateOfJoining, PhotoFileName)
                    values (@PlayerName, @PlayerUsername, @Email, @EmailPrivat, @PhoneNumber, @DateOfBirth, @Gender, @City, @Nationality, @Address, @AgeGroups, @DateOfJoining, @PhotoFileName)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PlayerRegisterAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PlayerName", plr.PlayerName);
                        myCommand.Parameters.AddWithValue("@PlayerUsername", plr.PlayerUsername);
                        myCommand.Parameters.AddWithValue("@Email", plr.Email);
                        myCommand.Parameters.AddWithValue("@EmailPrivat", plr.EmailPrivat);
                        myCommand.Parameters.AddWithValue("@PhoneNumber", plr.PhoneNumber);
                        myCommand.Parameters.AddWithValue("@DateOfBirth", plr.DateOfBirth);
                        myCommand.Parameters.AddWithValue("@Gender", plr.Gender);
                        myCommand.Parameters.AddWithValue("@City", plr.City);
                        myCommand.Parameters.AddWithValue("@Nationality", plr.Nationality);
                        myCommand.Parameters.AddWithValue("@Address", plr.Address);
                        myCommand.Parameters.AddWithValue("@AgeGroups", plr.AgeGroups);
                        myCommand.Parameters.AddWithValue("@DateOfJoining", plr.DateOfJoining);
                        myCommand.Parameters.AddWithValue("@PhotoFileName", plr.PhotoFileName);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Added Successfully");
            }


            [HttpPut]
            public JsonResult Put(Player plr)
            {
                string query = @"
                           update dbo.Player
                           set PlayerName= @PlayerName,
                            PlayerUsername=@PlayerUsername,
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
                            where PlayerId=@PlayerId
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PlayerRegisterAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PlayerName", plr.PlayerName);
                        myCommand.Parameters.AddWithValue("@PlayerUsername", plr.PlayerUsername);
                        myCommand.Parameters.AddWithValue("@Email", plr.Email);
                        myCommand.Parameters.AddWithValue("@EmailPrivat", plr.EmailPrivat);
                        myCommand.Parameters.AddWithValue("@PhoneNumber", plr.PhoneNumber);
                        myCommand.Parameters.AddWithValue("@DateOfBirth", plr.DateOfBirth);
                        myCommand.Parameters.AddWithValue("@Gender", plr.Gender);
                        myCommand.Parameters.AddWithValue("@City", plr.City);
                        myCommand.Parameters.AddWithValue("@City", plr.Nationality);
                        myCommand.Parameters.AddWithValue("@Address", plr.Address);
                        myCommand.Parameters.AddWithValue("@AgeGroups", plr.AgeGroups);
                        myCommand.Parameters.AddWithValue("@DateOfJoining", plr.DateOfJoining);
                        myCommand.Parameters.AddWithValue("@PhotoFileName", plr.PhotoFileName);
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
                           delete from dbo.Player
                            where PlayerId=@PlayerId
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PlayerRegisterAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PlayerId", id);

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
