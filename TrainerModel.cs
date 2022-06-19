using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BestTrainerAPI_ASP.NET.Models
{
    public class TrainerModel
    {
        [Key]
        public int TrainerID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string TrainerName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Occupation { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        //Pascal(TrainerName) -> Camel TrainerID ->trainerID
        //Camel(trainerName) -> Pascal
    }
}
