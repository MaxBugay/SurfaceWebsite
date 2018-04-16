<%@page contentType="application/json" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.person.StringData"%>
<%@page language="java" import="com.google.gson.*" %>


<%
    StringData loggedOnPerson = (StringData) session.getAttribute("logon");
    Gson gson = new Gson();
    out.print(gson.toJson(loggedOnPerson).trim());

%>