using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AdminUI.Models;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OrganizationDBContext _context;
        public UsersController(OrganizationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getUsers")]
        public IActionResult GetUsers()
        {
            var Users = _context.Users.Select(x => new {
                id = x.UserId,
                name = x.Name,
                email = x.Email,
                phone = x.PhoneNumber,
                img=x.Image
            }).ToList();
            return Ok(Users);
        }

        [HttpPost]
        [Route("addUser")]
        public string AddUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.Email == user.Email)) {
                    return "Error: There is already User existing with the email entered!";
                }
                else if (_context.Users.Any(x => x.PhoneNumber == user.PhoneNumber))
                {
                    return "Error: There is already User existing with the phone number entered!";
                }
                else
                {
                    _context.Users.Add(new Users { UserName = user.Email, Email = user.Email, Name = user.Name, PhoneNumber = user.PhoneNumber, Date = DateTime.Now });
                    _context.SaveChanges();
                    return "Success";
                }
               
            }
            catch(Exception ex)
            {
                return "Error:"+ex.Message;
            }
        }

        [HttpPost]
        [Route("updateUser")]
        public string UpdateUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == user.UserId))
                {
                    var userDetails = _context.Users.Find(user.UserId);
                    if (_context.Users.Any(x => x.Email == user.Email && x.UserId!=user.UserId))
                    {
                        return "Error: Another User already exists with the email entered!";
                    }
                    else if (_context.Users.Any(x => x.PhoneNumber == user.PhoneNumber && x.UserId != user.UserId))
                    {
                        return "Error: Another User already exists with the phone number entered!";
                    }
                    else
                    {
                        userDetails.Email = user.Email;
                        userDetails.UserName = user.Email;
                        userDetails.Name = user.Name;
                        userDetails.PhoneNumber = user.PhoneNumber;
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: User not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

        [HttpPost]
        [Route("deleteUser")]
        public string DeleteUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == user.UserId))
                {
                    var userDetails = _context.Users.Find(user.UserId);
                    if (_context.Users.Any(x => x.ParentId== user.UserId))
                    {
                        return "Error: The user is being used as leader for some other users!";
                    }
                    else
                    {
                        _context.Users.Remove(userDetails);
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: User not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

    }
}