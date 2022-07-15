using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UploadImage.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public string ImageName { get; set; }
        public string DateOfAdding { get; set; }
        public string PhotoFileName { get; set; }
    }
}
