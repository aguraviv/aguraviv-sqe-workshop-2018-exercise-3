import * as esprima from 'esprima';
<<<<<<< HEAD
//const esgraph = require('esgraph');
//const new_line_object = (line,type,name, condition, value) => ({line,type,name,condition,value});
//var string_range_code;
var codeSoFar = [];// fields of: {line: the_line_code[index], Number:1, is_it_statement: false}
var returnCode = []; //field of: codeSoFar[index].line
var global_and_function_variables =[]; //{variables_name: his name, variable_value: his value }
//var input_vector_values = [];
var string_range_code;
var string_of_input = '';

const parseCode = (codeToParse,input_vactor) => {
    let the_line_code = codeToParse.split('\n');
    string_range_code = codeToParse;
    for(let index=0; index < the_line_code.length; index++ ){
        codeSoFar.push({line: the_line_code[index], Number: index, is_it_statement: false, color: 1});
    }
    var tetee = '(' + input_vactor + ')';
    var object_input = eval(tetee);
    var values_of_input = Object.values(object_input);
    var names_of_input = Object.keys(object_input);
    for(var i =0; i<names_of_input.length; i++){
        string_of_input = string_of_input + 'var ' + names_of_input[i] + ' = ' + values_of_input[i] + ';';
    }
    const root = use_loc_to_parse(codeToParse);
    returnCode = [... codeSoFar];//saves copy of the original code
    module_builder(root, 1);
=======
const new_line_object = (line,type,name, condition, value) => ({line,type,name,condition,value});
var table_array = [];
var string_range_code;
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57

    return returnCode;

<<<<<<< HEAD
};

const use_loc_to_parse = (codeToParse) => esprima.parseScript(codeToParse, {loc: true, range: true});


       
=======
const parseCode = (codeToParse) => {
    string_range_code = codeToParse;
    const root = esprima.parseScript(codeToParse);
    return root;
};
//reads the loc parse and saves his location
const use_loc_to_parse = (codeToParse) => esprima.parseScript(codeToParse, {loc: true, range: true});

//takes from the user it's input and sends it to module         
const build_table = (codeToParse) => { 
    string_range_code = codeToParse;
    module_builder(use_loc_to_parse(codeToParse));
    return table_array;};

    /*
const module_builder= (root) =>{
    switch(root.type){
        case 'Program' :  program_helper(root); break;
        case 'BlockStatement' : program_helper(root); break;
        case 'FunctionDeclaration': function_decleration_parser(root); break;
        case 'VariableDeclaration' :variable_decleration_parser_for_array(root); break;
        case 'ExpressionStatement' : expression_statement_parser(root); break;
        case 'ReturnStatement' : return_statement_parser(root); break;
        case 'IfStatement' : if_statement_parser(root); break;
        case 'WhileStatement' : while_statement_parser(root); break;
        case 'ForStatement' : for_statement_parser(root); break;
        case 'BinaryExpression' : return Binary_Expression_parser(root); 
        case 'Literal': return literal_parser(root); 
        case 'Identifier': return root.name; 
        case 'MemberExpression' : return Member_Expression_parser(root); 
        case 'UnaryExpression' : return Unary_Expression_parser(root) ; 
            //needs to be  finished
        case 'UpdateExpression' : update_expression_parser(root); break;
        default: return;
}};
*/
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
    
const module_builder= (root, color_of_line) =>{
    if(root!==null){
        switch(root.type){
        case 'Program' :  program_helper(root, color_of_line); break;
        case 'BlockStatement' : program_helper(root, color_of_line); break;
        case 'FunctionDeclaration': function_decleration_parser(root, color_of_line); break;
        default: return module_builder_second(root, color_of_line);
        }}};

const module_builder_second = (root, color_of_line) =>{
    switch(root.type){
    case 'VariableDeclaration' :variable_decleration_parser_for_array(root, color_of_line); break;
    case 'ExpressionStatement' : expression_statement_parser(root, color_of_line); break;
    case 'ReturnStatement' : return_statement_parser(root, color_of_line); break;
    case 'IfStatement' : if_statement_parser(root, color_of_line); break;
    default: return module_builder_third(root, color_of_line);
    }
};

const module_builder_third = (root, color_of_line) =>{
    switch(root.type){
<<<<<<< HEAD
    //case 'ForStatement' : for_statement_parser(root); break;
    //case 'UpdateExpression' : update_expression_parser(root); break;
    case 'WhileStatement' : while_statement_parser(root, color_of_line); break;
    //case 'UnaryExpression' : return Unary_Expression_parser(root) ; 
    case 'Literal': return literal_parser(root); 
    default:  return module_builder_forth(root, color_of_line);
    }
};

const module_builder_forth = (root, color_of_line) =>{
    switch(root.type){
    case 'BinaryExpression' : return Binary_Expression_parser(root, color_of_line); 
    case 'Identifier': return identifier_parser(root);
    //case 'MemberExpression' : return Member_Expression_parser(root);
    }
};

=======
    case 'ForStatement' : for_statement_parser(root); break;
    case 'UpdateExpression' : update_expression_parser(root); break;
    //case 'Literal': return literal_parser(root); 
    //case 'Identifier': return root.name;
    //default: return;
    }
};
/*
const module_builder_forth = (root) =>{
    switch(root.type){
    case 'BinaryExpression' : return Binary_Expression_parser(root); 
    case 'UnaryExpression' : return Unary_Expression_parser(root) ; 
    //needs to be  finished
    
    case 'MemberExpression' : return Member_Expression_parser(root);
    default: return;
    }
};
*/
/* unsued
const Member_Expression_parser = (root) => {
    
    var x = root.range;
    var y = string_range_code.substring(x[0], x[1]);
    return y;
    

    
    //return ;
};
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57

const Binary_Expression_parser = (root, color_of_line) => {
    var left = module_builder(root.left, color_of_line);
    var operator = root.operator;
    var  right=  module_builder(root.right, color_of_line);
    var s =  left + ' '+operator +' '+ right ;
    return s;
};
<<<<<<< HEAD

//takes the new value if there is one from the table by it's name
const identifier_parser = (root) => {
    let name_of_variable= root.name;
    let the_new_value_to_enter = global_and_function_variables.findIndex((x) => x.variables_name === name_of_variable);
    return global_and_function_variables[the_new_value_to_enter].variable_value;
};
const literal_parser = (root) => {
    return root.value;
};

const program_helper = (root, color_of_line) => {
=======
*/
/*
const literal_parser = (root) => {
    return root.value;
};
*/
const program_helper = (root) => {
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
    for(var i =0; i<root.body.length; i++){
        module_builder(root.body[i], color_of_line);
    }
};

<<<<<<< HEAD
const function_decleration_parser = (root, color_of_line) => {
=======
const function_decleration_parser = (root) => {
    var function_name = root.id.name;
    var new_object_func_decl = new_line_object(root.loc.start.line, 'function declaration', function_name,' ',' ');   
    table_array.push(new_object_func_decl) ;
    //reades all the params
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
    for(var i =0; i<root.params.length; i++){
        var variable_name = root.params[i].name;
        global_and_function_variables.push({variables_name:variable_name, variable_value: variable_name, is_parameter: true });
    }
    module_builder(root.body, color_of_line);
};

const variable_decleration_parser_for_array = (root, color_of_line) => {
    for(var i =0; i<root.declarations.length; i++){
        var variable_name = root.declarations[i].id.name;
<<<<<<< HEAD
        var the_range_of_line = root.declarations[i].range;
        var string_to_enter = string_range_code.substring(the_range_of_line[0], the_range_of_line[1]);
        var value = module_builder(root.declarations[i].init, color_of_line);
        let local_loc = root.declarations[i].loc.start.line -1;
        //let new_line_to_add = 'let ' + variable_name+' ' + value ;
        global_and_function_variables.push({variables_name : variable_name,variable_value:value, is_parameter: false });
        
        codeSoFar[local_loc]= ({line:string_to_enter, Number: codeSoFar[local_loc].Number, is_it_statement:true, color:4 });
    }return;};

const expression_statement_parser = (root, color_of_line) => {
    let variable_name = root.expression.left.name;
    let value = module_builder(root.expression.right, color_of_line);
    let local_loc = root.loc.start.line -1;
    let operator = root.expression.operator;
    let new_line_to_add = variable_name +operator +  value + ';';
    let index_of_var = global_and_function_variables.findIndex((x)=>x.variables_name ===variable_name);
    if(global_and_function_variables[index_of_var].is_parameter===true) { global_and_function_variables[index_of_var] = {variables_name: variable_name, variable_value: value, is_parameter: true };codeSoFar[local_loc]= ({line:new_line_to_add, Number:codeSoFar[local_loc].Number , is_it_statement:false, color:color_of_line });}
    else { global_and_function_variables[index_of_var] = {variables_name: variable_name, variable_value: value, is_parameter: false };codeSoFar[local_loc]= ({line:new_line_to_add, Number:codeSoFar[local_loc].Number, is_it_statement:false, color:color_of_line });}
    return;};


const return_statement_parser = (root, color_of_line) => {
    let local_loc = root.loc.start.line -1;
    let to_return = module_builder(root.argument, color_of_line);
    let new_line_to_add = 'return ' + to_return + ';'  ;
    codeSoFar[local_loc]= ({line:new_line_to_add, Number: codeSoFar[local_loc].Number, is_it_statement:false, color:4 });
=======
        var new_object_func_decl = new_line_object(root.loc.start.line, 'variable declaration', variable_name,' ',' ');   
        table_array.push(new_object_func_decl);
    }
    return;
};

const expression_statement_parser = (root) => {
    //var name_of_operator = root.expression.operator; -> not relevant currently
    var name_of_identifier = root.expression.left.name;
    /*var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]); */
    var x = root.expression.right.range;
    var value_of_identifier = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'assignment expression', name_of_identifier,' ',value_of_identifier);   
    table_array.push(new_object_func_decl);
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
    return;
};


<<<<<<< HEAD
const if_statement_parser0 = (root) =>{
    var test_range = root.test.range;
    var test_to_enter = string_range_code.substring(test_range[0], test_range[1]);
    //var test1 = module_builder(root.test, color_of_line);
    let local_loc = root.loc.start.line -1; 
    //let my_string = string_of_input + test1;
    //let eval_condition_true_or_false = eval(my_string);
    //if(eval_condition_true_or_false === true){color_of_line =2;}
    codeSoFar[local_loc]= ({line:test_to_enter, Number: codeSoFar[local_loc].Number, is_it_statement:true, color: 5 });
    if_send_by_color(root, 1);
    return;
};

const if_statement_parser = (root, color_of_line) => {
    if(color_of_line === 0){
        if_statement_parser0(root);
    }
    else{//we may need to paint
        var test_range = root.test.range;
        var test_to_enter = string_range_code.substring(test_range[0], test_range[1]);
        var test1 = module_builder(root.test, color_of_line);
        let local_loc = root.loc.start.line -1; 
        var color_to_print=1;
        let my_string = string_of_input + test1;
        let eval_condition_true_or_false = eval(my_string);
        if(eval_condition_true_or_false===false){ color_to_print = 3;}
        else if(eval_condition_true_or_false === true){color_to_print=2;color_of_line =2;}
        codeSoFar[local_loc]= ({line:test_to_enter, Number: codeSoFar[local_loc].Number, is_it_statement:true, color: color_to_print });
        if_send_by_color(root, color_of_line);
        return;
    }
};

const if_send_by_color = (root, color_of_line) =>{
    let ksdmvk = [...global_and_function_variables];
    if(color_of_line===2){
        program_helper(root.consequent, 4);
        global_and_function_variables = [...ksdmvk];
        module_builder(root.alternate, 0);
        global_and_function_variables = [...ksdmvk];
    } else {module_builder(root.consequent, 1); 
        global_and_function_variables = [...ksdmvk];
        module_builder(root.alternate, 1);
        global_and_function_variables = [...ksdmvk]; }
=======
const return_statement_parser = (root) => {
    var x = root.argument.range;
    var value_of_return =  string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'ReturnStatement',' ',' ',value_of_return);   
    table_array.push(new_object_func_decl);

    return;
};

const if_statement_parser = (root) => {
    //not sure if needs to evaluate or take the string as it is
    //var test = module_builder(root.test);

    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'if statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    module_builder(root.consequent);
    module_builder(root.alternate);
    return;
};

const while_statement_parser = (root) => {
    //not sure if needs to evaluate or take the string as it is
    //var test = module_builder(root.test);
    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'while statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    program_helper(root.body);
    return;
};

//need to be fixed
const for_statement_parser = (root) => {
    module_builder(root.init);
    //var test = module_builder(root.test);
    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    module_builder(root.update);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'for statement',' ',test,' ');
    table_array.push(new_object_func_decl);
    program_helper(root.body);
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
    return;
};

const while_statement_parser = (root, color_of_line) => {
    var test_range = root.test.range;
    var test_to_enter = string_range_code.substring(test_range[0], test_range[1]);
    var test = module_builder(root.test, color_of_line);
    let local_loc = root.loc.start.line -1;
    var color_to_print=1;
    let my_string = string_of_input + test;
    let eval_condition_true_or_false = eval(my_string);
    if(eval_condition_true_or_false===false){ color_to_print = 3;color_of_line = 1;} else if(eval_condition_true_or_false === true){color_to_print=2;color_of_line =2;}
    codeSoFar[local_loc]= ({line:test_to_enter, Number: codeSoFar[local_loc].Number, is_it_statement:true, color: color_to_print });
    let ksdmvk = [...global_and_function_variables];
    global_and_function_variables = [...ksdmvk];
    program_helper(root.body, color_of_line); //may be sending to module helper
    global_and_function_variables = [...ksdmvk];
    return;
};
<<<<<<< HEAD

export {parseCode,codeSoFar, global_and_function_variables, returnCode};
=======
*/

const update_expression_parser = (root) => {
    var name = root.argument.name;
    var operator= root.operator;
    var total_name = name+ operator; 
    var new_object_func_decl = new_line_object(root.loc.start.line, 'update Statement', total_name ,' ',' '); 
    table_array.push(new_object_func_decl);
    return;
};

/*
const Binary_Expression_parser = (root) => {
    var left = module_builder(root.left); 
    var operator = root.operator;
    var  right=  module_builder(root.right);
    var s = (''+ left + ' '+operator +' '+ right);
    return s;
};

*/
export {parseCode, build_table, table_array};
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
