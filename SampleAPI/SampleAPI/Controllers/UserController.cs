using Microsoft.AspNetCore.Mvc;

namespace SampleAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private static List<User> users = new List<User>();

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public User Get(string name)
        {
            return users.FirstOrDefault(x=>x.Name == name);
        }

        [HttpPost]
        public int Post(User user)
        {
            if(String.IsNullOrWhiteSpace(user.Name))
            {
                throw new Exception("Name is required for user.");
            }
            if (users.FirstOrDefault(x => x.Name == user.Name) != null)
            {
                throw new Exception("User with same name already exists.");
            }
            user.Id = users.Count() + 1;
            users.Add(user);
            return user.Id;
        }
        [HttpGet("GetAll")]
        public List<User> GetAll()
        {
            return users;
        }
    }
}
