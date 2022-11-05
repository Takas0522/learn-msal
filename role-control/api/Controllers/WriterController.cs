using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api.Controllers;

public class WriterData {

    public string Writer { get; set; }
}

[Authorize(Roles = "App.Writer")]
[ApiController]
[Route("[controller]")]
public class WriterController : ControllerBase
{

    private readonly ILogger<ReaderController> _logger;

    public WriterController(ILogger<ReaderController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WriterData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WriterData
        {
            Writer = $"{index}В≥Вс"
        })
        .ToArray();
    }
}
