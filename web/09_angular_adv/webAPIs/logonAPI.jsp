<%@page contentType="application/json" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="view.PersonView"%>
<%@page language="java" import="model.person.StringData"%>
<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    
    // When testing through URL tampering, must add something like this to end of JSP page name:
    //   ?userName=tug81959@temple.edu&pw=81959
    String uName = request.getParameter("email");
    String pass = request.getParameter("pw");

    //findPersonById will check if id is null or not...
    StringData person = PersonView.findPersonByLogon(dbc, uName, pass);
    
    if (person.errorMsg.length() == 0) { // means there was no database connection or SQL error
        
        if (person.CUSTOMER_EMAIL.length() == 0) { // means no db/sql error but person not found
            person.errorMsg = "Invalid email or password";
        } else { // means logon was good
            session.setAttribute("logon", person);
        }
    }
    
    // Valid logon would be represented by errorMsg = "" (empty string, length 0)
    out.print(gson.toJson(person).trim());

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.
%>