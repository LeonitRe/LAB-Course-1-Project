
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BestTrainerAPI_ASP.NET.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace BestTrainerAPI_ASP.NET.Controllers
    {
   
        [Route("api/[controller]")]
        [ApiController]
        public class TrainerController : ControllerBase
        {
            private readonly TrainerDbContext _context;
            private readonly IWebHostEnvironment _hostEnvironment;

            public TrainerController(TrainerDbContext context, IWebHostEnvironment hostEnvironment)
            {
                _context = context;
                this._hostEnvironment = hostEnvironment;
            }

            // GET: api/Trainer
            [HttpGet]
            public async Task<ActionResult<IEnumerable<TrainerModel>>> GetTrainers()
            {
                return await _context.Trainers
                    .Select(x => new TrainerModel()
                    {
                        TrainerID = x.TrainerID,
                        TrainerName = x.TrainerName,
                        Occupation = x.Occupation,
                        ImageName = x.ImageName,
                        ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                    })
                    .ToListAsync();
            }

            // GET: api/Trainer/5
            [HttpGet("{id}")]
            public async Task<ActionResult<TrainerModel>> GetTrainerModel(int id)
            {
                var trainerModel = await _context.Trainers.FindAsync(id);

                if (trainerModel == null)
                {
                    return NotFound();
                }

                return trainerModel;
            }

            // PUT: api/Trainer/5
            // To protect from overposting attacks, enable the specific properties you want to bind to, for
            // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
            [HttpPut("{id}")]
            public async Task<IActionResult> PutTrainerModel(int id, [FromForm] TrainerModel trainerModel)
            {
                if (id != trainerModel.TrainerID)
                {
                    return BadRequest();
                }

                if (trainerModel.ImageFile != null)
                {
                    DeleteImage(trainerModel.ImageName);
                    trainerModel.ImageName = await SaveImage(trainerModel.ImageFile);
                }

                _context.Entry(trainerModel).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TrainerModelExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Trainer
            // To protect from overposting attacks, enable the specific properties you want to bind to, for
            // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
            [HttpPost]
            public async Task<ActionResult<TrainerModel>> PostTrainerModel([FromForm] TrainerModel trainerModel)
            {
                trainerModel.ImageName = await SaveImage(trainerModel.ImageFile);
                _context.Trainers.Add(trainerModel);
                await _context.SaveChangesAsync();

                return StatusCode(201);
            }

            // DELETE: api/Trainer/5
            [HttpDelete("{id}")]
            public async Task<ActionResult<TrainerModel>> DeleteTrainerModel(int id)
            {
                var trainerModel = await _context.Trainers.FindAsync(id);
                if (trainerModel == null)
                {
                    return NotFound();
                }
                DeleteImage(trainerModel.ImageName);
                _context.Trainers.Remove(trainerModel);
                await _context.SaveChangesAsync();

                return trainerModel;
            }

            private bool TrainerModelExists(int id)
            {
                return _context.Trainers.Any(e => e.TrainerID == id);
            }

            [NonAction]
            public async Task<string> SaveImage(IFormFile imageFile)
            {
                string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }
                return imageName;
            }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
     }
 }

