using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using UploadImage.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace UploadImage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public ImageController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select ImageId, ImageName, convert(varchar(10),DateOfAdding,120) as DateOfAdding, PhotoFileName
                            from
                            dbo.UploadImages
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UploadImagesAppCon");
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
        public JsonResult Post(Image img)
        {
            string query = @"
                           insert into dbo.UploadImages
                           (ImageName, DateOfAdding, PhotoFileName)
                    values (@ImageName, @DateOfAdding, @PhotoFileName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UploadImagesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ImageName", img.ImageName);
                    myCommand.Parameters.AddWithValue("@DateOfAdding", img.DateOfAdding);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", img.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Image img)
        {
            string query = @"
                           update dbo.UploadImages
                           set ImageName= @ImageName,
                            DateOfAdding=@DateOfAdding,
                            PhotoFileName=@PhotoFileName
                            where ImageId=@ImageId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UploadImagesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ImageName", img.ImageName);
                    myCommand.Parameters.AddWithValue("@DateOfAdding", img.DateOfAdding);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", img.PhotoFileName);
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
                           delete from dbo.UploadImages
                            where ImageId=@ImageId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UploadImagesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);
                myCommand.Parameters.AddWithValue("@ImageId", id);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
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
