using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BestPlayerCrud.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace BestPlayerCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PlayerController(PlayerDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Player
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerModel>>> GetPlayer()
        {
            return await _context.PlayerModel
                .Select(x => new PlayerModel()
                {
                    PlayerID = x.PlayerID,
                    PlayerName = x.PlayerName,
                    Description = x.Description,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();
        }

        // GET: api/Player/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerModel>> GetPlayerModel(int id)
        {
            var playerModel = await _context.PlayerModel.FindAsync(id);

            if (playerModel == null)
            {
                return NotFound();
            }

            return playerModel;
        }

        // PUT: api/Player/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayerModel(int id, [FromForm] PlayerModel playerModel)
        {
            if (id != playerModel.PlayerID)
            {
                return BadRequest();
            }

            if (playerModel.ImageFile != null)
            {
                DeleteImage(playerModel.ImageName);
                playerModel.ImageName = await SaveImage(playerModel.ImageFile);
            }

            _context.Entry(playerModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerModelExists(id))
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

        // POST: api/Player
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PlayerModel>> PostPlayerModel([FromForm] PlayerModel playerModel)
        {
            playerModel.ImageName = await SaveImage(playerModel.ImageFile);
            _context.PlayerModel.Add(playerModel);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        private Task<string> SaveImage(IFormFile imageFile)
        {
            throw new NotImplementedException();
        }

        // DELETE: api/Player/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PlayerModel>> DeletePlayerModel(int id)
        {
            var playerModel = await _context.PlayerModel.FindAsync(id);
            if (playerModel == null)
            {
                return NotFound();
            }
            DeleteImage(playerModel.ImageName);
            _context.PlayerModel.Remove(playerModel);
            await _context.SaveChangesAsync();

            return playerModel;
        }

        private bool PlayerModelExists(int id)
        {
            return _context.PlayerModel.Any(e => e.PlayerID == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile, HttpContext httpContext)
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
