using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplication1.Socket
{
    public class WebSocketHandler
    {
        static private readonly ConcurrentDictionary<WebSocket, Task> _webSocketTasks = new ConcurrentDictionary<WebSocket, Task>();

        static public async Task HandleWebSocketAsync(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult webSocketReceiveResult;
            _webSocketTasks.TryAdd(webSocket, Task.CompletedTask);

            try
            {
                while (true)
                {
                    webSocketReceiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    if (webSocketReceiveResult.MessageType == WebSocketMessageType.Close)
                    {
                        await DisconnectWebSocketAsync(webSocket, webSocketReceiveResult.CloseStatus.Value, webSocketReceiveResult.CloseStatusDescription);
                        break;
                    }
                    else
                    {
                        // Echo the received message back to the sender (optional)
                        await SendMessageToClientAsync(webSocket, buffer, webSocketReceiveResult.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception (e.g., to a file or logging system)
                Console.WriteLine($"Error in WebSocket communication: {ex.Message}");
            }
        }

       static private async Task SendMessageToClientAsync(WebSocket webSocket, byte[] buffer, int count)
        {
            await webSocket.SendAsync(
                new ArraySegment<byte>(buffer, 0, count),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None);
        }

        static public async Task BroadcastMessageAsync(string message)
        {
            var buffer = Encoding.UTF8.GetBytes(message);
            foreach (var webSocket in _webSocketTasks.Keys)
            {
                if (webSocket.State == WebSocketState.Open)
                {
                    try
                    {
                        await webSocket.SendAsync(
                            new ArraySegment<byte>(buffer),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None);
                    }
                    catch (Exception ex)
                    {
                        // Log exception (e.g., to a file or logging system)
                        Console.WriteLine($"Error broadcasting message: {ex.Message}");
                        await DisconnectWebSocketAsync(webSocket, WebSocketCloseStatus.InternalServerError, ex.Message);
                    }
                }
            }
        }

        static private async Task DisconnectWebSocketAsync(WebSocket webSocket, WebSocketCloseStatus closeStatus, string closeStatusDescription)
        {
            if (_webSocketTasks.TryRemove(webSocket, out var _))
            {
                try
                {
                    await webSocket.CloseAsync(closeStatus, closeStatusDescription, CancellationToken.None);
                }
                catch (Exception ex)
                {
                    // Log exception (e.g., to a file or logging system)
                    Console.WriteLine($"Error closing WebSocket: {ex.Message}");
                }
            }
        }


    }
}
