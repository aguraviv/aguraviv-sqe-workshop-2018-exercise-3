import * as esprima from 'esprima';
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

    return returnCode;

};

const use_loc_to_parse = (codeToParse) => esprima.parseScript(codeToParse, {loc: true, range: true});


       
    
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


const Binary_Expression_parser = (root, color_of_line) => {
    var left = module_builder(root.left, color_of_line);
    var operator = root.operator;
    var  right=  module_builder(root.right, color_of_line);
    var s =  left + ' '+operator +' '+ right ;
    return s;
};

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
    for(var i =0; i<root.body.length; i++){
        module_builder(root.body[i], color_of_line);
    }
};

const function_decleration_parser = (root, color_of_line) => {
    for(var i =0; i<root.params.length; i++){
        var variable_name = root.params[i].name;
        global_and_function_variables.push({variables_name:variable_name, variable_value: variable_name, is_parameter: true });
    }
    module_builder(root.body, color_of_line);
};

const variable_decleration_parser_for_array = (root, color_of_line) => {
    for(var i =0; i<root.declarations.length; i++){
        var variable_name = root.declarations[i].id.name;
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
    return;
};


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
export {parseCode,codeSoFar, global_and_function_variables, returnCode};
