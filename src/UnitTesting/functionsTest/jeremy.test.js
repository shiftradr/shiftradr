const {add, archive, shiftScore} = require('../functions/jeremyFunction')

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  })

test('Tests archiving a post',()=>{
    expect(typeof archive).toBe('function')
      })

const departments = [
        'Crew Support',
        'MCCM/Reservation',
        'True Blue',
        'Vacations'
      ];
      
test('the departments have MCCM/Reservation', () => {
    expect(departments).toContain('MCCM/Reservation');
    expect(new Set(departments)).toContain('MCCM/Reservation');
      });

const shiftType = [
        'Trade',
        'NSA',
        'Permenant'
      ];
      
test('the shift types contain NSA', () => {
    expect(shiftType).toContain('NSA');
    expect(new Set(shiftType)).toContain('NSA');
      });
  
test("shiftScore() should return an average percent based on two number parameters.", () => {
    expect( shiftScore( 85, 100 ) ).toEqual( 85 );
    expect( shiftScore( 25, 50 ) ).toEqual( 50);
      });
  
test("shiftScore should be a function", () => {
    expect(typeof shiftScore).toBe('function')
  })
  
test("shiftScore should not return a string.", () => {
    expect( shiftScore( '85', '100' ) ).not.toBe('string');
      });
  
test("shiftScore should not return an object",()=> {
    expect( shiftScore( 10, 20 )).not.toBe(Object)
  })
  
   