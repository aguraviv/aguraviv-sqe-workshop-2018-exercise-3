import assert from 'assert';
<<<<<<< HEAD
import {parseCode} from '../src/js/code-analyzer';

let x = `function foo(x, y, z){
    let a = x + 1;
    let b = a + y;
    let c = 0;
    
    if (b < z) {
        c = c + 5;
        return x + y + z + c;
    } else if (b < z * 2) {
        c = c + x + 5;
        return x + y + z + c;
    } else {
        c = c + z + 5;
        return x + y + z + c;
    }
}
`;
let x2 = `function foo(x, y, z){
    let a = x + 1;
    let b = a + y;
    let c = 0;
    
    if (b > z) {
        c = c + 5;
        return x + y + z + c;
    } else if (b < z * 2) {
        c = c + x + 5;
        return x + y + z + c;
    } else {
        c = c + z + 5;
        return x + y + z + c;
    }
}
`;
let z = `function foo(x, y, z){
    let a = x + 1;
    let b = a + y;
    let c = 0;
    
    while (a < z) {
        c = a + b;
        z = c * 2;
    }
    
    return z;
}
`;

let x8 = `function foo(x, y, z){
    let a = x + 1;
    let b = a + y;
    let c = 0;
    
    if (b > 0) {
        c = c + 5;
        return x + y + z + c;
    } else if (b < z * 2) {
        c = c + x + 5;
        return x + y + z + c;
    } else {
        c = c + z + 5;
        return x + y + z + c;
    }
}
`;
let y = '{x:3, y:5, z:6}';
let y2 = '{x:1, y:2, z:3}';
let y3 = '{x:1, y:2, z:0}';
let p = parseCode(x, y);
let t = parseCode(z, y);
let t1 = parseCode(z, y3);

let t2 = parseCode(x8, y);

let q = parseCode(x2, y);
let f = parseCode(x2, y2);
describe('The javascript parser', () => {
    /*it('check length of p array', () => {
        assert.equal(p.length, 17);});*/
    it('check t first line1', () => {
        assert.equal(t[0].line, 'function foo(x, y, z){');});
    it('check t first line2', () => {
        assert.equal(t[0].color, 1);}); 
    it('check p first line2 color', () => {
        assert.equal(p[2].color, 1);}); 
    it('check p first line2 line', () => {
        assert.equal(p[1].color, 1);}); 
    it('check p first line6 color', () => {
        assert.equal(p[6].color, 1);});
    it('check p first line6 color', () => {
        assert.equal(f[6].color, 4);});
    it('check p first line6 color', () => {
        assert.equal(t1[6].color, 2);});
});

     
    
   


describe('The javascript parser', () => {
    it('check t first line1', () => {
        assert.equal(t[0].line, 'function foo(x, y, z){');}); 
    it('check t first line2', () => {
        assert.equal(t[0].color, 1);});  
    it('check p first line2 line', () => {
        assert.equal(q[6].color, 4);}); 
    it('check p first line6 color', () => {
        assert.equal(p[6].line, '        c = c + 5;');}); 
    it('check p first line7 line', () => {
        assert.equal(t[15].line, '}');});
    it('check p first line6 color', () => {
        assert.equal(t2[6].color, 1);});
});
=======
import {parseCode,table_array, build_table} from '../src/js/code-analyzer';
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script"}');});        
    it('simple identifier ', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 6;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":6,"raw":"6"}}],"kind":"let"}],"sourceType":"script"}'
        );});
    it('is parsing a function declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){}')),
            '{"type":"Program","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"binarySearch"},"params":[{"type":"Identifier","name":"X"},{"type":"Identifier","name":"V"},{"type":"Identifier","name":"n"}],"body":{"type":"BlockStatement","body":[]},"generator":false,"expression":false,"async":false}],"sourceType":"script"}'
        );});                
    it('is parsing a varibles declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let x;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"x"},"init":null}],"kind":"let"}],"sourceType":"script"}'
        );});},
               
describe('The code parser parser', () => {
    it('testing let details', () => {
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
                           let low, high, mid;
                           low = 0;
                           high = n - 1;
                           while (low <= high) {
                               mid = (low + high)/2;
                               if (X < V[mid])
                                   high = mid - 1;
                               else if (X > V[mid])
                                   low = mid + 1;
                               else
                                   return mid;
                           }
                           return -1;
                       }`)[0].line, 1 );});
    it('testing funtion details in array', () => {
        assert.deepEqual(table_array[2].line , 1);});  

        it('testing while details in the array', () => {
            assert.deepEqual(table_array[9].type , 'while statement');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[1].name , 'X');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[10].name , 'mid');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[9].condition , 'low <= high');});
        /*it('testing funtion details in array', () => {
            assert.deepEqual(table_array[14].value , 'mid + 1');});*/
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[13].type , 'if statement');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[5].name , 'high');});
}));
    

//}));
               
               
               
describe('The code parser parser', () => {
    it('testing let details', () => {
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
                               let low, high, mid;
                               low = 0;
                               high = n - 1;
                               for(var i =0; low <= high; i++) {
                                   mid = (low + high)/2;
                                   if (X < V[mid])
                                       high = mid - 1;
                                   else if (X > V[mid])
                                       low = mid + 1;
                                   else
                                       return mid;}
                               return -1;
                           }`)[0].line, 1 );});
                   
               
                   
});
               
               
describe('The code parser parser', () => {
    it('testing let details', () => {
                               
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
                                   let low, high, mid;
                                   low = 0;
                                   high = n - 1;
                                   for(var i =0; low <= high; i++) {
                                       mid = (low + high)/2;
                                       if (X < V[mid])
                                           high = mid - 1;
                                       else if (X > V[mid])
                                           low = mid + 1;
                                       else
                                           return mid;
                                   }
                                   return -1;
                               }`)[0].line, 1 );});
                       
});
>>>>>>> d8991ec06d3367819b92ee0e38de3b51dc203c57
