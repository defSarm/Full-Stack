import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.sql.*;

import java.net.InetSocketAddress;
import java.util.Map;

//For compiling on the shell on repl: Same on mac
//javac -cp sqlite-jdbc-3.23.1.jar: Main.java
//java -cp sqlite-jdbc-3.23.1.jar: Main

//Use for windows
//javac -cp sqlite-jdbc-3.23.1.jar; Main.java
public class server {

 public static void main(String[] args)throws IOException{
    (new server()).init();
  }


  void print(Object o){ System.out.println(o);}
  void printt(Object o){ System.out.print(o);}

  void init() throws IOException{
   

    // create a port - our Gateway
    int port = 8300;
      
    //create the HTTPserver object
    HttpServer server = HttpServer.create(new InetSocketAddress(port),0);

    // create the database object
    Database db = new Database("jdbc:sqlite:Project.db");
    
   // Add your  code here
    
    server.createContext("/", new RouteHandler("You are connected, error") );
    
    String sql = "";
    sql+="Select * FROM Line";
    server.createContext("/line", new RouteHandler(db,sql) );

    String sql2="";
    sql2+="Select * FROM Routes";
    server.createContext("/routes",new RouteHandler(db,sql2));

    String sql3="";
    sql3+="Select * FROM Schedule";
    server.createContext("/schedule",new RouteHandler(db,sql3));
	
	String sql4="";
    sql4+="Select * FROM Trains";
    server.createContext("/trains",new RouteHandler(db,sql4));


    
    //Start the server
    server.start();

    System.out.println("Server is listening on port "+port);
       
      
    }    
}


