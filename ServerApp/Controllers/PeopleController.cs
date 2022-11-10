using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        readonly IPersonService personService;

        public PeopleController(IPersonService personService)
        {
            this.personService = personService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonModel>>> Get([FromQuery] PersonFilterSearchModel filter)
        {
            return Ok(await personService.GetAllPersonWithFilterAsync(filter));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonModel>> GetById(int id)
        {
            var person = await personService.GetByIdAsync(id);

            if (person is null)
                return NotFound("Person not found.");

            return Ok(person);
        }

        [HttpGet("{id}/posts")]
        public async Task<ActionResult<IEnumerable<PostModel>>> GetAllPostByPersonId(int id, [FromQuery] PostFilterSearchModel filter)
        {
            filter.PersonId = id;

            try
            {
                var list = await personService.GetAllPostWithFilterAsync(filter);

                return Ok(list);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetAllCommentsByPersonId(int id, [FromQuery] CommentFilterSearchModel filter)
        {
            filter.PersonId = id;

            try
            {
                var list = await personService.GetAllCommentWithFilterAsync(filter);

                return Ok(list);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PersonModel model)
        {
            try
            {
                await personService.AddAsync(model);

                return Ok(model);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] PersonModel model)
        {
            try
            {
                await personService.UpdateAsync(model);

                return Ok();
            }
            catch (BlogException ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            await personService.DeleteAsync(id);

            return Ok();
        }
    }
}
