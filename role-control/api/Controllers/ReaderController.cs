using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api.Controllers;

public class ReaderData {

    public string Reader { get; set; }
}

[Authorize(Roles = "App.Reader")]
[ApiController]
[Route("[controller]")]
public class ReaderController : ControllerBase
{

    private readonly ILogger<ReaderController> _logger;

    public ReaderController(ILogger<ReaderController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ReaderData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new ReaderData
        {
            Reader = $"{index}В≥Вс"
        })
        .ToArray();
    }
}
