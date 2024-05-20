// See https://aka.ms/new-console-template for more information
using ClassLibrary1.Models;

Console.WriteLine("Hello, World!");
var db = new MigdalorContext();

foreach (TblUser user in db.TblUsers)
{
    Console.WriteLine($"{user.UserId}, {user.Username}, " +
        $"{user.Password}, {user.RoleNumber}, {user.RoleName}");
}