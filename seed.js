const mongoose = require('mongoose');
const Recipe = require('./models/recipe');


mongoose.connect('mongodb://127.0.0.1:27017/recipesApp')
    .then(()=>{console.log('DB connected!')})
    .catch(e => console.log(e));

const oldRecipes=[
    {
        recipeImg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUFBcVFBUXFxcaFxcbGhgaGhcbGxoaFxodGhgaFxsbICwkGx0qHhoaJTYlKS4wMzMzGiI5PjkyPSwyMzABCwsLEA4QHhISHjIqJCkyMjgyNDIyMjIyMj0yMDIyMjIyMjQyMjIyMjIyMjAyMjIyNDIyMjIyMjIyMjI4MjIwMv/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAEDBAYCBwj/xABAEAACAQIEAwYDBgMHAwUAAAABAhEAAwQSITEFQVEGEyJhcYEykaFCUrHB0fAjcuEUM0NigqLxFZKyByQ0RFP/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QALxEAAgIBAwIDBgYDAAAAAAAAAAECEQMEITESQSJRYRMUI3GBkQUyM0Kx0aHw8f/aAAwDAQACEQMRAD8A9MpUqVebOiKkKVKoQ6pUhSiiBEKemFPUIKlSp6sgqRpUqsoU0qQWdqixWMtWhNxwD0GppkMMp8IFySJopwhrLY7tcFkW1A8zqaz+M7R3X3c/OPwrZDRr9z+wDmz0Z3VfidR71CcfaG9xfnXldziLnc1A2ObqaatNjXb/ACD1s9bHELP/AOi1Kl+2dnU+9eOjHN1qZOJOOdT3fG+3+SdTPYgs7fSmrzDCdoLq/aPzrQYHtadngjzpctJF/lZOtmvFKqWE4paubGDV2KzzwyhyGpJjRSp6VJoIaaY0qaqLQqanpqoIY0hT01CQUUqeaarIc0qVKlhDgU8U00hUBHp65mnqEFT0xNI1CD0qVKjIPNJ2VVzOQqjn19KixeJS0md/YdT+lYTjPG3vMdYXlW7Bpr8UvsJnPsgxxjtTulrQdeZrJYnFu5kmoXaoHet+y2QpsdnqB3ofjOLW0MA5m6DYepoZcx9xzAhB9aCU0DLIo8hx7tVXxSjdh8xQjumPxFj1k/QVKmGHIe8/jppSZZhTzrsX/wC1L94fMV2mJB51RXDaTHtOlI4PJqFJ1JMR9dJofblLPYXS9Vq1coKkqPtCdB9oew1ip7WJjfbrI0PSJoo513GRyp8mlwuLZdjWq4Tx8iAx0rB4PEK3wkHrHL1HKiVh6fGaYyz1LD4hbglT7VKTWE4ZxFkI10rY4PGC4PP8az5tOnvENTrksmlSNNWB7MaKuTXVMaoIamp6VDRY1KuqVXRVkYpVzTxSbDHpVzXQq7IKuq5pTUspnVKmmlNQqjoVzevLbQu+w2HU13bHXQDU+lY3tNxU3GyKYUVv0mDq8UuBOSdbIH8a4o19ySfDyFCmrpqo8Rxi2kLMfQdfSuhKVIQc4zErbUsxgfU+QrMYriNy7MHInQbmOtR3MQ9xi7NAiAusAERtWr7MpbtWr97u0vNbtofGvhRncwolvEBkkmNYAkCSUuVuhE8l8Gfw3DF7h707OqKAMzS2pZtNFjpz35SkteWmm+3Wpra5iRprJiOpiB0HKjHF+EDDFFzpcfKTcVPssDGUkbnQfWss5tqzO3ZQBt92qhBnGYs/NsxAVfIAAma6t2QSAOcDqYkT5zTWcjEgxtJETp6ins4fU5WjxE6yQQBso133EfKktuTruVTs5yZSR5kjz9TyNdonP8Nz6fvlRG5w64thbtwKqMYWZztHxeCNFEDUxv51TW2CrMmuWCzLsqkkQTEEzG3IVThLui1BsifD6yd+URz/ADqM4ZZkgDXfUcvKp8zEhW0kem8R9Nd/6RXLxDZQCeUiN+eh0J0mhXURJ+Yv7OPEU8L7SJiY5ztvy86v4HFkZVuaEj4tgY9NqrGQQ0SBvBM+Z8/andQ65Z35iNuo5TrVxyyi7DhlcTSWTRrh2JKnc1jsFjjbIV/FbmA3NeUn/LPrWns+VdLDmU16muMupWja4XEB18/xqas/w/EFSKPBwRNL1WG11L6jscuzOqVcg001z+ofR1TUppVLIdUq5ilV2Q5iminJpiaSwkKlSpTUssemp6VQoaKcCkKkQa+W59qPHBykkgZOkDO0GN7q3lHxN+wKwLmSSfejPaTG95dOugoJNdxRUUorsZG7dkV1wASdBWJ4jijeuE65V0Udfbrzov2lxpEW13O/5D86C4ZDyB/f4HzpM5iMk62CHDsOHuKoUsub4SyiQNWzNIAGhOvL51fc+AjKAC41UgI2VQAFUDYT8W5nnJNG+x/9nRDda0Lt0s+VCdERLebOwM7kx8ulWOFPhlQXb4Vrj3SBJcwsA3HZV03f4T5+2aTT2tevoZpWR9iuBi7fDv8ABbIcq27MsQFHQEqT/MBzqhjcWxfIyEqrXW38RZ5kg9JjrMVewXFnt27lvD2wFuPkN063PHOVfQgdNNedbSxwPD21S9eIlVXOziAfDAnOTl57amaqOJZEku3L7EjG1SMMnDlm2i3La57ed3Yg5ACfD5MAo01OvyrYe4ltmyyxAbLIVVY6HUMHkfTXcc5MbxYnvbKgAZmPhVB/CnKMtwmddoCg5edBHvOpLKu0DqIJ8RAkktudBpv0qlBdSUeQ1FN0uS5xXFXrrW3uOviLZQdwBoNekk7BRptpqPsYoqMp01IknQgdco0nppvUQxZJA8ZVgxDEgMQWj4SZAmRv+NcJhyrZV0AWAp6HZeoMkSd/lTJJb9XIxrsy0XfISpWQJYtK6CR5ScomnsA/FqRA0PKNiP1rm1lVM1xTodSFnzjSfr+M1HYgQ66TzI3HLfkSDSWlTpAtJp0i73hMayYPp+450haM5gYPIDaeYJG+vlXAOYSfDrzMg7RFIu+U5RLCYBO/lMfKk15CfkT2LpIhx5Eb/P2/Cj/Z/Ex/CY6a5DrIH3TO3ON/Wszc8STHiynzidwD1/SreGuncTpqDzPn5fTapGTxvqQcJ9L/AJPQrAg0cwFz7J2NZvheKF22r89m/mG/6+9GsM0V2MclOKa7m0InQxTg0rmoDexrgGuPnh7ObXbsbIPqjZIGp5rgGnmlJhUdzSrjNSouoqhjSAoecUw5/h+Ndpim5gemxrbP8MyrhpmOOuxvZ2i7FPFU73E7Vtc1xltiY8RETVixfS4MyMGHUGayZNPkhzFmiGWMuGSU4FKkKUMHFcYu7ktO3lFSChnae5lsgda2aKFz6vJCsj2MPecsxJ5k1XvOFWalcUC7S4nLbyjdyFHvvXTk6Rnboz9+53lxnO0kwf8ANoPpV7h+GzOltQSzsoBEkDMY1HPn+xRXshwhMSxVbZu3AC7BrndIq7D4VZ3bXyHrW04fw25buoif2awzq5VlR7jkKRIL3TMka7cqwZMkItKT+hmpy3oz/Dr+Hw1y7b0V8xtg3JEgGC7NEKx000gdeceDtXrVjvhlVHfKMwBZ9wcuhBX4gdYNbTF8JCsA925cdwQbjW7DqGUSs5k0GkRP41huHYe/jbptqc5A8TN4VQTuABCgToB7RWaDhOTcLbYOSLSSoI8FwFpLYxOKzd2dLdpPieMviBB0QREyJPtJPjvHbeJFnDWn7u2zfxC/gyKIygkeGIn6VY4lggO9UMBbRrdtYk5LaIMw01JJczPOgfFuBoq5rQuAgiQV1I8tPL60HvihJ4ktrp+tepTi1HY4vYJ0uNhcPFy45OcgKVICMCASdgrHeJPtWeucPK3ChIQg5CWzKFAaGkDYcj71PYvvauK6llOoBBIYcjHMc5Hlzq8mDe85jPcJYEsJYnOJB6mZnWm+0fKX++QtTa3QNx/CbSsi2WDsAc7BSqh2JOUFt4A+LyO0VYv8PtphluG5JdipUAghlCs8sTpAZRt16U+JsiFKKQR8ZzZg3qsArv1NVFKZHUhpmRtkJ5yD1jl71PadXP8Awjnb3InMaqYXSBObcwBvzn9Kiv2SYyaDN4vSJPv+tdNh4ADkkA5tDpPmB84pYi0EB3OuUidNducb+VWmuwSlXHJFZxysxUagGB1MafjPSrOYTElmieYMRlny3+tDCT3kuVBJhdII0123BHnuKlLupnICZMgGTA0npzijljV7FyhvsESesbmN+X7FOSFbMSQCdddCT5D+m9RWHnXY9Cee3ympwI1neB9enoaztVsKTZouymKy3Ch2cSNviXb5ia21mvLcLiO7uI0/C/qPDG/TT8a9Ts6xFbtFPZxNmGVxoJWtVI8qrq1T4XeqtzRiOhNB+Iw2UvodDTu7RMGroGoFau1NcxMe0TTTVzSo7KoGPeCjUgQJLGI9ddKxnFu26gm3hIdtR3hEqCI+FRv+/Wsn2r7WPiGyKctj7ojXzeDrIG2w86y+GfK25HSfmJr02TK/2nIw6Rcy+xe4ji711819mcySJ1A9B9kUf7N4q5bAdHedwMxj8davdmbKBJulcxImCC24yx0rSrwiyyd4P4eYiCEOTXbOBJEbZuvI8gx5434h2bTS6fB9gr2b7Ttebu7yZG5MCIPqOVapayQwwsD4QG36lp5gnlRnhHEM6hX0YbazIHnzNYtfo0l7TGtu/wDYvS6mV+znz2C4oH2ufwAUZDUD7XD4f3zoNA7T+hry9jJuKynaZ/4lsfzt6ZVrVODWZ7QpNwa/4b/Ugfn9a1ZHRmyOosL/APpx4LuZRJJVG3jI4aSTygqI9YrRdtcctu4rpPeLGWACo0MHUamOnU615/hcfdtI3ctDEQDJEQcwK+cmqGN7Q45wwdh4iCTzkCAYmNvKuTLTSy5Oq1XkxcZJwq9z0zA43EPbYX7lu2kfa1JOjAErCjSNddtaxr4kW7l1LF0lMxWUJGZdHyysTDMR/pFZqzgbt2WuO7AkSPFEnYa6ctq3drD2LAt3LV2wrr3YCgpmBRRJYGATpJnXXnUWGOBund9ktkVOpxpbtd7CdrCvewnguNne748zhJzHM51GokKY13oBx3sziLCC610XZYAlZBkmBHiOk1Z49xq2oS2r2xktkKyeIMbhlpddBA0Gg3qs3HWuYR7aurZcqZpAAGbeJ9Nd9fWVRjmi01xf8+oDSqn2QOscQa46i65blqCQpAOh5ySN/Op8Dx4o7qrBlGQhtZRlLZTbaJA8T848R8jUOF4M72muAZp0JOUqJEyGkgtHKProNFe7I2kWxbQgs6AvdJnKrCQttRpGigu3whpAkgVuhBStIXBWnfIOwwuuly9bXRFLMzCQV1mQdG9D1oIOJ3DzWdpyqsa+Q03r0Hs/lXB4qzdIVlOUg7DMNNeYMT5yDXmxw5VpBmTIEa7afjWfA05STXASgkk/Mv2+IuRlBVo0AyrAJIBiRJMAT6VBhmuvdeygDjRgoQSSBmjTzmoYk5HMA/iJI2Ou1W8PxDuEcqn8QqArEeFYcMHVgc0wsDY+I9K0dKVqKW5fcguYbMoZl5HLrMHYgk7GBTW1diJIAA5ddQDqOlTYXiK3gXvKC8nxKsBpM5ivJtNxqdJ61Mh5/Lr6mlzbiqf/AAmSTQ6H5/v9+1So3M9Y8hI/5+VRZ55gaaR++dSISROg356jeJH73rPJCWdK+mXTUSBJ56iOleocDuZ7Fpjuba/MCD+FeXGJgD99D9D8q9L7KmcLbn7p/wDI1p0b+J9DTg5Yfw9U8eYuH2q9ZGtDOLvFz/SPzrRr1eL6o6Om/P8AQdHqZWqgj1YRq4lm5otTT1FmpVdg0fNYthSwcbHroQSRKnnU3DMLncQpYBhrBjUwsxMakD5UWwfCGv2SUHiX4AZljvA8iPkQKs9mcPDoQJG59Dyj1r0blsZYw3DnDeC4ksxQ5Mh1zD7s8gNY1+lb7s+0plucwwaPFLT456CRz/SuMHjkW3oIEQTC6c8pJ3OvTrVL/qHdXWMaEAzpIDc9N/OOo2rG5j+i7NDjOGjKY8S6kxqV13TzHSgrIbbhW1YiUcSAwGoI6MOanaeYojgeN27giVPPTyPTereMwy3EJ+yZzZfiBGzLP2x/StOHOlt27oxanTda8pLhiwuJzLr8Q0YefUeRqv2rSVU+VCMJi3W69u5HeJExAFxDqrqPP6GRR3i695h1Ya6b/T8qHFg9jkl08NJr+hay9cUnytn/AGYxkrN8eT+IvnacfIg1q2XSgPG7Gtt42eD6MP1ApmVeEDIvCBsE1tSDc1UalV+JhEjXkJ0n1rYcE4DhMT4wLhCMM7kZBOvgVVB5azmnUbVkLOHLZVUEsdAoBOYnZQIk1pcPhLuHsXyrOjKEFwKREmQw06Sw06GudHMoO2rXBiS3Jr9jDrYu3bFoFO9yLnzS7ssKttV2VQSdZJOp88fxPB3blw6BRtlOvweHbqIj1rXcIxIuYOMoRUud2cubvbr3NQNTCodJkH4NANKGcNLW7gbLmK6ZWUPr0g6SN/UVeSai1LvRG6oCp2TuOBkW640mFLDXlK6fWj/Bf/TtDdAxPhOQ3FtZvEyg5TnK6gAxIEkgnUVexvarG22FxmhGIVVKjKTG2w10nSDT4jtct68cyOlxAGtFdSuUDMp+8S2fQ8j5GpLL8NuLbf2GQab5KnFcE1qUaAAcqoohcs6ZIMRBB96M3uJ2TrfRmdfDmHgNxVkKDGgPURErIO1HMNZtYy3DDu3QjMq7GdQyjoQZ1EiaGcZwNrDtmtBWuHQFoyJznL9ph5+/SsazuO8Vz9QvYy5RjOKCxat3Gui4C4/gICyO0H4myn4AeZ35Dph8CGJbxtExM7+5ozxh2xDstoFyTD3ZLBiJJCk/ZBMToNoAFS8D4ZnGTKu+pJAywpljzAEzO05RvFdHH8ODvl/7wU10Roiw5VAHdmzagZtNB069Z9KmXCG4RqCAPKPLb3o3c4Vgyw7pQxCye9ZspIBLGQRrpsBHSqth1EKIC8l1yk9dDrSHlT3jf2Ft1utyDE8JYoqWtWdk+EEnYmFHkVmreN4e1tfFDGPEqnNlIPwk7T6aec1o+zOGN1rlpUXN3MITOQeNQ876ESPcjnVLtFxi1aYWrdpbmRe77yYzBehVju2YkmTrRyTlFNBfmSsz1ogCD+g0J/Kaey3iIGsmYGw6ST6fX3ru5ca5kZgAwHLpynz/AKVylrLmOxbbz8/y06Uh1uK4LKK7MigEknLA67AfOvUOzKZcNa5ygP8A3SRr7153wVG70NE5Fd/KQvg/3lB716rgLOS2iclVR/2gCa06OHiv0ZpwLZss2hrQHjV3+Ow6AD8/zrR2l1FYjH4nNfuH/OR8tPyp2ufw69To6XeV+hdtvVu29CrF2r9pq4jRvZcmlUealUKMT2c7LpkVmLEiCviIg9Mo33PyqR+GPaxPdnKO8BNttVVWJDMoWfDIBOp5npRfAv3DAyGthQVed5J0IiZ859auY5beJRcoOcMrJMyrKc2aN439tK7UJ29xMo1wA8VhGMRADDQAEZ45+59DtOlR4DhDXG8AHgM6xpvGh3/fKj92x3lkr3hktqHA0I8TITyYZSehHLUVLwte6Rg6JnLEqRBzaDUHc8/SD0oZpBqboHHCPa/vLZULtdQxo0fEJ1E8vOpcHj3uXGQchBjNmbWM2WOQ1j0qfjt0uBNsjfxlCYVviCk7GY1rnh9rO6ukBra5STJJLbkkRpudZ2oKVl79Nso9pCbapfg/wbgQnbNbu/KYaD6E1pOEXBdw5A9R6HX8ZqDj3Ds9q6piHtMpk7aHr50G7AcSLW7eb7S5W6Bhy+envXR07coNPscjUpRyKa77MbEWokedC+JWM9thEmNPUbVreKYWGPQ0HuYehmrVBmf7IX7drvb7KtxraKbYP3rjBRvrpzO+9abhiq2EuNeOUXD4S5VSx6ieZ1P+qsxcK4V3JXMjMlyB9rJnOT3LCgPaLtHcxl0NBRFgKm6rHQCD++dcjPillahwkZY+BuwoS+FLl7crLFDAnMmnxb5SpOx1hYpWO2fdwbeGtWz552Om2pbeDQi5xG73Rsu2jlF2ACrmBJYgdN/Q1Rt4FSSA0ryOp9atYouHxKYFqPDLXaLtLdxQVXygK6uAqgbKykkbncb0S4CwFzvoObQAwMssCDm18JIDQROpodguG27dxWuqxtk+LKQrEciNCN9I8qL8d4hbNtVsoUDlHy81yLlXxAzPxNPVqvJ0uKhDh7E63dmnxnaC3/Zna26rcVMoOgZxGgAIzBhOhy6iR0rz7i2Ixl9SqpcKZoZmVizGJOYcgTso0gAa0PN9w0kkktmnU6zMxz1recH4glxUDsCZAYkbsdhp8KxqdtaV0+6pOKv5joZFN77GM4FaaziLbXNcjqWkyuUHxLoelbDg2DuX7l1UAFjOHuEAgMFJIEHXQHY8zQHtbjcl5LWQIVBYqoXRmlUBK/EABm15mvW+B4ZMHgoXUlWcjTMxI0GmkxC+wpuWbnBSdJtPckcXXKjBdo7wtm6yDIHIQLscsAkkZdTIXUR8RrNWNSpOgGsDz009p+dEu0vEDduXGBOVSqDQakD7vIyIk/d6zWdGKfLv7gf7V/Wi0+Nxgk+e5eWKi6Ro7PFXt27i22yNcALEaEIvIE8jpr5eZoXbUsQTOh0BgyNd59J9qtYXDA287atyHmNCTHIT6Vyy6RPqRp8qqc62RllLyFIga6n8NPpNSXyMqgGSBqQZ5zz20gVWRSWDdARoOpnX6VZt4ZrjC3bEu5CjzMgCfKlUrSBrc1PY7h8gE/4jgDrkskOx9Dc7tfY16RGkUF7PYFUXMNVVFt2z1VJLPG3jcs08xlo3FdbTY+mJtxx6Y0RYu+Ldu5cP2VPzjSvNVukmeda7trjMlpbQ3cyf5Rr+MViUbWsmtlbUfI6WkjScvML2XonYegVh6K4dq5skawl3lKoZpUFFUZbEquEfubgD2yQULHTp3Z5jkR5ek0c4ViltnVTmdhqvLkFEHYDyFDu1WGF21IAzDVT0YeJfUfkTVbs1dGJRXcwMoLRoZ6aa8j7kV2VumKlGgv2ytPay4pASoI70TpsAtzTcj169Iq7wMPcQXDNyNFYyJXn8jrMTrRRrS37bIVY22BUhidQdCBOvIfsUP7JQlrIxM22a38U6ITEctsvuKlgX4SpiOKd6z23UqqN8JYEtrtA05jmfSpuHyl0ECAVPoAG+u5qDitv/ANwSWCI2XNsYggTvrH67VbsPIMFWjKqkQd/ASI1EzM0qS3tDVtGgjxG6zW2WcswAYMkH09qwPYiQLqT8F66ANtnaD/x0rdXECW2k6QSY+zG5AOp1Gmh5VjOx/wDeYkgf/YvaxyDkRB/frW/RX1O/I5X4il7NfM3rHvrYb7Q0PqN/1oLfSreDxZtv4vhOjfgD5/pVnH4XmNjT8kOlicOTrj6mVx+BFxCD7Hof0rJHDZbhUgSDGwBr0N7dBON8KzjvLcd4P9w6evT5VztXibXVHkmTH1bmRv4YOwQabHUbidhP66TT2rIQQNthv0/Saus86iQw0PWYE+h1qre8JE7ec9Ov1/YrmqTa6TM12OXbQ7x+HzoRjsMGYMDr5Egwf60XVtcp0894A02HL0qIIZ294Pz15UzHJwdg8PYBf2d5HjmY3AmPOrVq5ctsDlJ15ECfYjX50TYCI1J5++5/H586PYXuxbNt7YymDmCoWBI+8wJI8gR9aZPUKvErDTt70Y27nvXXvOuVmYnLrpsBE8oAq9/1m9Ytm2Cz222UsfBlO6Hl/LttRbG9zbGcscswRlIcDkfunXTrQ0421d8Nu2Vy7szSWPkNhz61Fkcq8PhQyMpRbmC34mjIECMpE6kSSx0mZOg2j10q9Y4dcFu27WyoYsUkjUdQu5H+aI2ovwDDWQz3LtrvAqeFZ0DyDJXTPodpjTnyO3blpnhFMuTnuPld2BHijSE6AiANOlVm1MYqorf+CTyPIvIy1q+4YJGUgDTybXUxOutcMQDHqJ1MZRyHSrvEcIbbNh28RtnMjffSDl9Zn51SdGYyI5k8p005aa9Kq06aezQqqdMkswVJHXT+nlWw7HcEOlx5D3ElRtktsIZ+oZ9QvlmNU+zXBWud3du29DrbtHQ3CDox0kWxoS0ayBqTXpWCwvdgknM7au0RJiNByAEADkAKfp8DlK2Px497ZNathQAAAAAAByAroEasdABJ9BTt0rM9suLZE7hD4m+MjkvT3/WujOaxxt9jVCDnKkZfjvEO/vO/2dl/lG360OVta5c1yGrizk5Nt9zqxSikkEcOaKYc0IwxophWpMkEEaVczSpRAfxPGBfDllCAGiAc8SCvMxr8xUHYa2LffI+yXm+IRGmZQVO+kaUS4vi7ZlECzDbiQYAInTUg8/TzrI9nsbcXGYhA05irnSAZVZPI+4FdhPmvIVLdKz0pOLi4FW0Qcxg7jKOokCeQrNniIw+Pe3Ji8ocbkF08JAgfalflrV/g/Dk1d8w8Y3ML01676cufOhvaPhq3cfZUGCEfXTXfMCJnpz69DQw6pK5AtKLaiFr6reG7SWAIyiVPOdDpp+E1NhMGbb5BJEHXTeYbbTbXWhTIbZGa4C0QftQAICt12ireAJtupEwRpoSDmEmSD5a+lU2gnFpchriFsC20kt4Tt6SIisJ2KU907Eavdut6ZnY6mtzxy4Fw9wwNEOh5mORnXSsf2UQ28HaHPICSepEmujoorqb+RxvxCb6Yr1YTxDEnafn76c+VXuCcSBixcOuyE+X2J69KEYl4k7xG/WdNOZkj5+9BMW7CXJI6akem3Pb96VvnFSVHNw5HGVo3uJwsHyqm9uqfZbtOt8CzfIF0aKx0Fzp/qjlR6/hYrA0jsdjJ8W4Pnm5bgPzGwb1PI+dZjEWTrm8JAnWARynz35delelNbofxLg9u8IuLryI0I9OVc7No7l1RE5MalujzbuNAVkHQzuRHpoPSpCN56kH16fKj2J7OXbbeBc6gaMIGgEQy7zt12oVewxBgrHkZH7/pWGdxlUjNNSXKB2VjM+cGPYf80YV17sMR9kQI1zDSPKQfrQ/u4mFP5n0jzq9giYymZAVxm1G0MJnUxr7VJOwY8AntKhFu2xX49VMjoDJih3C7TssyeYA6AneOUmflRvjOHW4SLjkKluUSfFLaQoP2ZEn5VzggFtoBuUUkeeuuvkTWjr6cdDsjSWwlQKOVRpeYHcxP7+tXcPhHuNlRWJgwI0gbmdgPOi2G7K3G3dJ5i3/EYeRg5VPqwHnSY45S7CVFtg5SbihhmY2fETBMW2YBg3u0j1NFuyvBhcYtcQXHQ5e7IIRSN2ukjYHTINSVM6Ue4R2XNsMrv4H+JIBuNpGV3GgXyXrvWntWwmiiB+9+prXg00v3KlZpjj2ViwWBFslz4rjRmc7wNlA+yokwo09ySbZNcq1UuLcVt4ZMz6ufhTmT59BXS8MF6D0m3SOeN8VXDW8x1uNoi+fU+Vea377OxdjLMZJ86m4hjnvXDcuGST7AcgPKqTNXLz53N0uDpYcSgt+RnNMKZjSTes44v4YUUw4ih+FWiVpaXJllvPSpRSpWxCJeEqGfvFGoLAqQAOoIGu81g2s5OIm2C0MqwPCCYJAnYAaD5A1ueK8YBUrbEmYLSYIIMDT+m9ec3brvj2fVssAkyTsNzz0iuzji09xDbaPRsBeOfK1xRGhOkZRqTqNCNSOW+21D+1XFlt47ClSYBbO3t+IEdBtVng+A7wjTwAHNrGn0MRPlWY4gyXOIqoBZUQwsj4mOWNNo3mTtPpFVkrua+/YCsZbXMDGpkN4hp6aR9av4E5Sq230OUtp4VYsAPePrUtqxaOQXHJZlgGdYETr1qXEWFswMgNsg52MEyRCyfSdupHOlx5suctkij2uxJGDvk/cfUaEkDX0EAQZ110qDAhe6thPhCIAevhGnyj6+tQduvDhCABLlF0XTxMAAI9Rr51S4YO6XuSB4VzIFVsqW5hFdyDmctnMDmdK6Wj2TON+I71Xay3iQo8zJ/A69P+aznFbukfQfOPSi+NumN4H76/T0rNYu5maYhY0B/E1syS6Uc7DHqkULl2CDzOoPpz8ta3PZvtoVAt4mWXYXNyP5xzHnvXmz38zlvYeg2q5ZeuFkyyjNyXc9JjxR6FFnuttUuKHtsGB2IMg+lRtZrzPgfErtkzbcjqp1U+ordYDtMlwAXVyH7w1X9RT8ephPZ7MTkwSjxui8bdRX8EjiHRW9QD8ulX0yOJRgR5Gac2qdLHGSpqxBm7/Ze022ZD5HT6z0psP2WCgiUcQBLKwYRJlWV9DJ6a1pRbro60n3TH2Qtwi3dGEudhy1ws11SNgCpML05A8+Q3ohg+yKoQxusW6hEG3TNNaopThKnukO/wDJfRHmgXY7OWc2Z1N1vvXCX+QbQDU6Ac6NKgUQoAHQVwqmpcnMwB1On1NPhjjHhFpJcHEV2qUH4h2kw1mRm7x/upr8zyrIcV7UXr8qD3SfdU6n1NBkzQhzyOhhlI1XG+09uxKW4uXf9q+p61hMVjHuOXuMWY8/yHQVSd6jFyudlzSyfLyN+PFGHHJaLVwxqHvKRekUMs7mrNi3UFpJolh0qNkRZw6UQsrUNhatIutJkwibJSpxSpZW4CuMgOYkQupXkRIy8oM+W1cdm8EqWLuIZQXuXWht/ApCEjTYxP8AqFUeJ3DbtsxAGhgLzMHRDJn+tW8BbuC1Ztboo8W8ltzvtrHz+XabSFNWg9jsWLGGuMuUSTl0jTwyRzMS0+leb9m7L371zEDNoZUgNOVTE+Wm/v7Fe33FVISxbMOwytBaAD8Xh21B9au9mlS1bW2wJmXZQAhBjKAX3Zchn6c6KMaTYDlewRGLuQMqGAIDmDlmZ6ekfjR/D27os6vMru0ANnESekab9aF2Sty4tu2CEY/CJywDMekRWhuowy5QpUAyCY10+E8udLjFdQUpbUY7jCvcFtbhBm+gXYnKjq0QPQ7+0Va4paZwChOdWzLLMqZiMoLBNwASY5kD0qLHPnxSLr4c9xhOoiUSSSdCWuR/LXWJckGNh8p6eddbSx+Hv3Z5/wDEcnxqXZIE4jGK6KyTlYZlkZSVkwcu4ED33rP8TuwvmxI9uf6e9EuIOFY65szZmMsdTC7nRVACwB941nMXfzuTy2HpSdXkpdPcfosSb6uxEFq1hhJqtyonw23Ncib2OxEO4BNBRqwlUMFboxZSsc2PR1ZUrqpKnqCR+FELXFby/aDfzAH8IqsqU+SrhnnDiTBljhLlBFePsPitg+h/UVIO0Kc7bexFCGSobiVojrsvevsKemgHD2mtD/Df/b+tV7va9R8Non1I/KgFxarOlH77kfkT3WAWxPbK8fgRE84k0AxvF713+8uM3lMD5CmdKrulVLPOfLCjijHhFZmpg9dPbrjJSxjHc1GGqVrelcraqFMYV2iVMlmrNqzVWRIWHt0RsLUNu1Vy0lLky0WLIq0gqBFqdaWyWTxSriaehohi+0+mUDQf2hhHKO9TSKKcVYqYUwMyaDT7Y6UqVdfJyhUOGef2mJx2pn/mt1Y+z/MKVKm5OEDi7mg4IP4nt+TUcxO/sfypUqGHLBnyYbAf/KxHpaHtB0rvEfD8/wDxpUq7GH9NHm9X+u/mZPiX92/qPxNA+lKlXL1X5zs6P9MkG3yo9wqlSrDl4N8eTTYSi1mlSrFMd2JhTmlSpZZw3OoWpUqtEK1zaq7UqVHEpld6qtSpUxFHDVE1KlRojOztStUqVQpk6VYt0qVCyy3bqZeVKlQMhZTapVp6VAyHVNSpVRD/2Q==',
        recipeName: 'Palak Paneer',
        recipeDesc:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laboriosam quae quis, ea quidem architecto mollitia iure quo! Labore asperiores illum molestias!',
        Ingredients:['Palak','Paneer']
    },
    {
        recipeImg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGCBMVExcTFRUYFxcZGhocGhoaGiAcHRwaHxocGxkcGh0hHy0jHBwoHRocJDUkKCwuMjIyGSE3PDcwOysxMi4BCwsLDw4PHBERHTEoIyguMTExNDE5MTExMTEzMTExMTIxMTMxMTExMTExMTEuMTExMTExMTExMTExMTExMTExMf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAEgQAAEDAgMEBwUFBAgFBQEAAAECAxEAIQQSMQVBUWEGEyJxgZGhMkKxwdFScoLh8BQVI9IzQ1NikrLC8QcWg5PiY6Kjw9NE/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwUEBv/EADARAAICAQMDAwIEBgMAAAAAAAABAhEDBBIhMUFRE2GBIqFxkbHRBRQyweHwI0Lx/9oADAMBAAIRAxEAPwDTMKUr2FuHfOVF43AqRTziDof2kf8ATn1CK53ZpWQrMCBpKRbuKSKFc2M59hs8DmdHoVxVVMtW0KViki5ceHAFISfAZPjTMLjUEx1js/3lIFuPs0xOz3kGU5geTqgPIhVCrYxgM5gRvlSSfMsCimS+kt1YxsnL1sE/3k/SmpWn7Z/xD5EVVu4RRGZTaiBMkIYV6wPOg9mraUtSesbbUDP8VpCJvlOUpMG4IO+imJUaJLqJgLHgoT8TQ72020Kj2/urKlTfVKdO+uQhpPshpX3Wyq/lHmanZdWdyo/Agd3ZzGnQm0RDFk+yhZ+8F/OmvJfWCEggcc8R60uIxN4IiOK78vcp4C1fYKeZUfpNPaFgbmCfX/SOgJG4OKTPecxnuqD93JCipTyb2AStRj1mfGrIoKbr6obgcp+ajUZWRotpP3UoBPmk0mkCbBktYcr7KzmG8hR8BmMGpUhsSS6Ei47Qy33xNvKm/tIAH8WfxJHrlFPQ+smQ6Y0u4ABvsMsGgRzSGVXS8kp0sEi/3pvTxhUpuXJsACLHwgxTihSoBWmN8lJ+KTUrWGWJIdgcIT8SinSC2RJaVqTAI1UpUeNC4woNi60EwJuSZJ0zTBmKtGm1SZIXvExr4fSo14UnVtrWZCVT52NFApFYvBkkq6xQkzZomEjTRJTreagewzapUpa3FDQQs6SRBATaatlsTMoMjQ/xIM7hNB4zFtN5StLvpE+JFJpBuYOlhBygZkka3SJ01lRMzfS81JiGWM0LWoTcoChBGlyACZ4TUS8fh5zHrTOkZfiFUqdotDRt1wGxzBPDmo0Khtss2MOykBSQe8rBPdfxrqrWMasAnqHIVcRlPlJFq6i/YXyXxQJ9k9+SfgmuUU8QORBHxAoIbbwa4h5I/F+dTJxWHOj48Fwf81G9eQ9OXhjupQTO8WkLI9JqN1k+6tYPJU+hEVI2pJ0fChzIPwA+NcvDK1QtKuSjPrcjzo3J9GS2tdQYLfAIUUkR76YEfgqZpKPaX1YJsIN5jSSJp+J2elYAWlQjQtqIIPGxBjz0qDEbMcMIWUuN8TKXB4iyjvkxcUX4DhmZ2tt8nElprMAgAkhMlQN9csItpJrR4HEOKQkkq7UFKiRcEbrQO43qnHRSFuKDl1lMhR7PZGWwAMGPGtThsIG0JSnQADiTH+/DeaUE+5LJtpbQNaFn+sPipP0E0G5s8Zgcyucyf8vOrhDqh7IVv4AH0p7b7l5QruIT6EGpFabKjC7PQn2gk8siz5ZpiphgERYpH4B801ZdeuO0gx92T6KNDh0qtJR3tn60h2wP9jE6p/wI/ktUT+z0mxyETvSP5hVhkeFj1SuBOZJPeIMVGoO6Bts9y6BWAN4FqOyEnjppw/pJqRvDEA5Uz3ZvSQasG8IYukDkFKjzy007OBMlsd4WZ+AosRWrZM9pC0RrlcAB4QJHyqUoJB7K5GhmfRKjRjuHFh/EH3VGnlZCQO2RGhTPxEmi0OgJLzo0SBzXmH+gn1ppxjwIktEcE5vUmi0JRqI/E2BHoDXExEuIg/3lJ/1UxFU5jnpsRE71aDmN1KnaLusZhycUPUfOrLDti6TKo/8AUzfFVC5QFwW1Jk2P8O/gE/Gk+BoGdx7kZureE7wCoesg11WDmzkHUE96U/ICup8haMsroYARGGaKd/ag+EU49DW9Dhj+F4jv31syFbhbfCx80U0OLmMiu/Og/Ko7F7lnqy8Ixj3QtoA5WHAeTqpHkTSDoo42AELxAVwC1ADvUZrZKcWDcK7pA+CaQuuWsL6y4qPRqlsT6sfqvwZfB7PxSBd7EAx9ptQngZTMU3FYvGo/rnNT7rZJjeLi1a0PL35PFa/5KQ4hf2WlfjP8mtL0kHq+UY3984qJGKIEwQpjMZ3eyui047aEBQxDRSd5ZX8lGtKWwq6mEHnJ9JRSfsaFf1aU9y//ABin6bXcPUj4KAYrahMhbBHPMn0ymKnbxu0/7PDn/qKE+bdXrWEAsEiOaz8KeMGeAP41fy0bGL1I+P0M8rau0Rqw0eQdHzApju38anXBg/ddb/mFaU4Nf2FEcln5pFRKwDh1Q7/jT/LT2yFvgZn/AJleI7eCdEfZUn4BcmlT0xSLqYxSe9tR/wBJq9d2YrNJbdtzbP8AqBqH93EKkpc7ilH/AOlRcZE1LGVI6dYbeHU8ZaI/01Kx06wOnXR3iPkKs/2Mx73KG02/95qH92JV7QUd39GkfM0ts/8AaC8YOx0l2etRWHUSYBJI+dWCNrYRejqD40Avo/h/eT/8Q+tDYjophVaIbnj1V/SipgvT8l0nqFey4PMVxwuaCl8xp7U/Os4vojh7ewO5DifhSDoswCIcI7lvi3nFL6vA6h5NA3s99JlL+YcFBKviKQYXEf1i0qAIIFkga6ARNuNVA2GhOj6h/wBV4fGal/c7oTKMU6DyWoiPFo0mpS4r7gtq7/YtAnFAqPZcSTIBEFP4km4rqDawmIT/AP1K/E2FfBCa6pbpeCOyPlFuMxkhw8hA+hqMLcgynNyBT5+wPjTlLyAqURbnNuPGh2tqNOHsqSTutHzq215K6fg57FJzR1a57kgfCpU5YnJHIRPwqUYgcQO8WPpUocSbnLBG406FfsCyCf6NdvD/AHqBx5IklDkAHz+Jqyw2FSvRMAe8SQP13U9DbTZlAzK+0fkNPGk4hvSAsFg1uDMM6UnQqOUfCTRzOGSkypxS+QsKjceUrU0k00kVucmF9ekeykDvufWkVilcaFvSipECfrjxpQ4eNRUgoETh08ak6877996HFOBp2BJkbOqE+FqYvBJPsrI5H6ilSacDQNSZVYhTjftNqj7QKSPOaiVtBWuVw92WPjV+hwih8TgG1yUgIVxiU+IpNMmpruioTtAHVLg70zT2ccgC4cNz7h+VJiME4iyygA6dm3+akVg16hTf+H5TUaZZcSZG0ExISv8A7avpT/3iB7pgf+mr6UK3hlKsVI8E/wDlUbuFWFSHGo+785o5FUQpW0Ujd5oI+VdQeKccSgBT7Qk65cvxV8K6i2OojyV/2rX/AGVf/rULoMwpbJnd1Sh/9hoc4EoEi/ODp560S3s9OUGQZ4A/WahS7kla7kbmECblpgxe8p+Rq02RgQE53G0NpN0pQokq75SmBRGCwSEALUkH7Ai5PE8q59wqMk1JKPghOb6WPfxBNhZI0A0FQE0ppDAvUmVnAU9KaqsbttluwOZRMAbtYuazuM2viHl5G5mbBPHnyrjy62EOI8v7HVi0c5cy4XubVx5CbqUB3mhP3zh5jPHgfSs0vYzpALjpzRoJIqn2008x23CXGgACE6hIM2B0POuT+eyzdRpHTDR4u8r+xunNv4dIkr05U5G3cOROe1YfEMkgKbEp6sG0mVRpfeDM1V4rHltam1AASqBofKII7jS/ms7lSatFy0OCrdnpze2mTvi03geV6nwe0G3BYxeINq8x2ac/8RaiQAQlPKTmMd9TY11aTKVW1I4TzqK1maM6bT+CnUaPHCLas9VBpwNYDYXShSOw4CoDQzcfWtls7aTTolCweW+tHDqoT4fD8GZ6bauPKDxT01GmpAa7CA5UKGVQBSdxrP7Z2S4iVslJTvzap8tRV+KclUUmrHGTizEh9YgZm+4E+cBNTMYhR7NoFz2VCZ8KudsbLABdaSn+8mCY5gZgIrPPPJN8yfwmB6O1TTT7nSpKS7BGPxtkpXAA0zZgCY4BBm011VGJGbIRmzCYgnhxzKJtO6uoJFu/0cZIsp0Hgl90f/ZT9j9F0hwOqcfCEEEj9ocIWRcJIK9OI4W30mDQ6tQRmbUTxaGu64NaTEQlIaTEJ1jed5qSXkrm64I33SoyaiIpaE2rtBtlBWswAKUpKKtkIwcnSHY/GNtJzLMDjWK2n0gdeJS3IQLkjhpbgNLnjUDhfxi8ysyWwbBQjx/3qV1sgdUCE7yALniNdIFYuo1fqS23x4/c29NpY4lbVvz4KlaiAVaiJMg7wQL/AKijOi21G0KUTKwUgiOIOYAEcwKz+J2gFJLWUpUeyoXFr9k34x5VaYRHVpgCLeo3fnSlHZHnr2I6nOktqV2W21ulriL9Wco14+G41FhdrnFgoQgwR2iRYA6bzWO27tIkhAEyRb5Voti4p5DYW2wEo3gHtHdEcNKJ4tuJSrl+WQ0st/8AUkqNR1HVspAAAFgIqt2swHgGiATfUcBqJ0PdRezMfnSAtsoV7QKjICjbjIsTVZtvbKEiQgqKFQuDEGOdZ2GGT1KS5vqaDmlF2UuzX1BspIyqQo5VSNZEpUndrYg94NiCHcTuWlWUCRlBMqNo0sJ41CwwpbYyoAzysgnNCQYvzk+laXBdGpIJVlA90GRIG/6VpZHHd9S/I5J8Ru/zM20dDATv1PruFqtsEg5A6g5CSTO4jefEifGrF7o00iXJKyPdIseQoV11CEKIbygGwm3d5VRklaSj3K9NhqTmnfxRdbH6UqSoNviJ0VuPOtew+lVwQfGvLcMgvEIAlNjMbvlaKMw+MewipklEixvI5V0YdZLG9rdrwPUaPHlW6HEvsz00UtBbHx6XmwtPlRtbmPJGcVKPRmJOEoScZdUKhcGaoukjfUgOoaW6hRulGSUHnnUkRV6KdAUChQlKhBqTVii6Z5+3jUqWpa2MQgEAAQZkXsGXDa++kofpG2rCvlC1ri+Uk6pOm7w8K6q6Z1KNqzW9HFoUlbyc0DspzADtECSI5fGiCd9SdQltpDSRAAzG83Vcyd+seFRGpMobti5qxWJcTicWorMobPZT9pQiZ5A7q022sUGmXHDuSY+8bJnlmIrznCbPcQ6HF2JBMk2JuSZSbixi8Gs3Xcx23X7mhoIcuXwbh9xGmlt1UXSDGoAzJABGWdJiaq0Y9WZOZWdSlZUhHtf3bC+vxFB43CklYhaYnOlXGZkjTh6Vi4dHsknJ8GpJxguoV+7pdW9KMqkwN5J5cx+tKFYwy5WEZrDS5m8WPORapdl7TRmaZWgAJEJIJMkXJVIMwkE7t9ahnBqWSpBIBIKY8ZBBnfl/w115Jyx8SfHYpXp5I2YPZGBWVrK0EG1rcdeRvW2KENtpQLGNefy3+NNGx1Zys5c0niRyvxmqw468EzCiDwka241VkyvM/p7fYnDHGKSTCwid+voNw40AnBtoKsySc5hRm8nge+KJaxYm1uZnu3afKhcinVgIGbS24a6+PypY7jd8LuWOL7lv0NwZIKcsqMiONzv00rRYhJRAUIklPcoC4rPFx/DhJ7IhKRmBm47PfpE31nSpmMatzWw0uYtv5ip5J49ja5f2OOWKc5X2LTFuiDwg1j8S8l1a8OnXrEpO+2UEkeKY8avSzmUSmRI0Jkcr8KocFhktlZIUHsxUSYMyb5bXBueOtVYpxlb7rp7f+HRCHp8eTRPKaYb7hAjXw3z61ToxyXDkMkGYJFwY9KFwpUpwqcczGLpNvQ6RUOMWkL7NrzmAMk8I4fSljxbZNN2/JP6WjSdHesZX2FBSNVIJgkct01t8FiUuJCkmQf0QRuNeXYTHEEApSm2uW8kyfGbd1aXo9tHq8QlBPZdEgcFiJjvBB860dJqHjntfRmTqY+pbdWvvRtYpaQUtbhmlX0p2UMQ2DllbZ7PGDY/rlXVbtqg11FEt9cFdjlytXfUFOcNz302qxmX/AOImKUllDSNXFgDwINvGB41mHldWlIcVBAhQMEpixETxMefOjem74cxYaJhLaJJvqdADoCb+RoB1gOWCsqjOWe1Me7qINvWsrPJSnz5NzTwcMSa8fqVS8af2hIaSQVHs5dQZlOUnQ2F6tkLLiStZJJmTIBJMz6mqZeBczqWbBqJI3TZJJ3CTUq9rNIhuSvLqn3ZsdZvN503UskHOlE5M0puKUl3f+CsxGNyYhsn2UrTMcJhUfhJr1vYxysN6Zot5mvFcc2paio/avAjyG61en7A2iP2VgrUkQmCTbSRPpVP8RxJ4415JaNN3H5LhWKTlVAhQkkH1ivMnX8mIUYVlVaYmVTIHnpW4fx7SgtKVBRUDlItJ4xa16yrOEU5igwgkpSSpyRZIBlO/U8dRNqo0EFjc93Sr5O/PHbFbfKJcQ6EFvMopST7RF7xMbvStRsTFoT2W0jIN+88yd5o5jYLK2wFIChNpSIEaBP2SDv1qn2vhVNEqbuM3bTz5c+VUZM2PN9C6/YnCSk3FlhtnDZxnR7wII1EkXMaVXYXENJSpK+0tMmBdRAt2QBrbSl2ZipUUFyx97MCkQdRx86yfTjaAD6UMqKlIMqWN6ju5mZn8qs0+neSXpv8AEWSfpq38G8RIGcJiUzexgTrOkCgsZiBl6xZATE5jA19kDmT3UGjHKUgIdKVEpBBQcwMiYMXB5EDjVTtl553+E0kpEgAX7RNzlESYBjzoxaWXqU+HfIZcqjj3ew5bylOWAyqIJMCQYgXi1jparLC4VTyshzBtJBsqJI3W+MTz3U7B7GWwgNOoUlRGYyb33yDY29KL2YvInqlKuVHKrcoHQW94b/OrM2RptR6rg5dNqYZHtap/qQbawyUN9ahJT1eWTcynSPAb+VP2RiErCSkjMk52ydygLg8iLVb9SlSSlYJTBBmCCN4jhWVGCS06UpWcuoEXA0ud/wCVVYckZebQZtO5SuNHrez8SHG0LGikg+YoqqTowhTYUwpQVlMoI0KDcR3aVd16XBk3wT79/wAUY2WG2bS6HCurq6risq1a0hpXB2j301SaqZNHlm1nusxrjgRnIUEpSLZjMAcR31M62tGV9LYF7iZNxpIAnXh3zeoVYUjGLa0UFEgxuBzfSSbCCeVaVeFOQE2KSCO+DeNDcD0rFyzcUn+Z6CLjaQGnZqVwpYywoLCYGYKEEyeUDzPGgX3GG23Wg2ghSgRmGbKEkgqUbmO0OI1sZrWYZhBQLgmLmb8/OqLaezUrJCIBOoA9rl/tXFp9VLe23x9iyUIyVFfg8Ph3AVEJUVXBH08NKrcdgoQQkwCoBHIySTAPpHCrTY+yOqxGRRhC0qKRoUkRI15yKndwRzpbbIKe0e1cgbyeNyL7gK6XmSnSfuRWNK2QbH2K4ttJXiYcUNMoOURvVrU+ydjKw2KU4tefOCknSxIgx3p9aY8VMPICj/DiJA0O4cSNPGn45paz/ClU+0JsN17c5quU588qpFuxPrybDDYvKAnJHCI/R8qB25NlFNpE8RxPeDeszsjpZbqlp7aVFCl2CABMKnUkjXnQG1+kalkFKjlmDYmTFh3wPSudaPIp1X7FMVFPcgzbWBbAIRCVOLBnibdkQOz8LjwFwuyEpdCFAJ462n2otG6w0FVuLQ8UIecCgMycqRIIEiQeFr/hrTYNp1WRbjiWwb2EwAbSqbExwrtkpwglu9n+JKMk5couGdnslvKkWi19+nEXrM7aw5w6ioTnhRCpiUkQoWIJsdJOhBEa6E4htJTBBg3ga7twql6W4lUJAEkqFtSDB05xI8DXLppTWVLqmLNDfBpsF2biisA5jpAvOm7kOVWwQFgJVvOo3EXBndffWO2TjCkkZClIJ5xc+Q+laBO1G0BMkkqskAEkn7ovV2fDNT+lWY0cc4vhB5xS5W2r2kiBwIj2jEeVRs4MKCHFruRl7QJiLmJItP6vTsWFKWlwtwAMpUrQ6FUZhqkX49oVWYvFkdoKhsmQANNBJJ0nWlHFS8WbGGU5R+rt1L/YCHFOobCrH2VgxG8+VejI0jXnxrzboU7nxDfZynMfgZPcRXpNan8MjUZPvZmfxF3NL2EJpaQV1aZnAOORDihzqCi8YoLSh0aKSPPfQlQaJpnmnSjFHD7SKyOwoJ+Ak8/yo7a212nAgt5pJhaY1TqCmDqDNo31N/xT2dnbQ6BdMgnlqB8azOw8IOpL18yD2kDciPbBiwCrE7pHGsvNjTbXjsb2nUXCM34r59y4w2KLasyVhxG45tZ5TO/dwqbF7cbZR1iwCtwdkJN7A2HKSL7qr8KtBbSpd7mMySUpIuEJVxiOO+1I/s5pSg6opKY0EzBnjczAGg3248foQ3XLp+pZKbcaXUk6P4lwpXi3VpzLBS2CbJG+NTE0/EPHMFpWQpQAB3JTmGYmJ/LyNNeSHAEhPVoToDKTmManRI/Kn4AgwnLAbABN5uSDPGYiDYyPB7bk5tfHt4JJ1GiXbuKceQlrKEBJlRNySkGIAFxaZMcKHw7riFe3BKdQIzCRY7km9WKUrT2psTMkXKNwJ41WNspWV5SZKtdSNCL7vDfUE0lVcfuNRK3B7LCVqUoSlQMEGIV7pN7zNue68VqMHgW0ZD1aEm+YkRAkwAdfP86q9sYJTbaHoIS0UqO/Qi8HS+lTYHaqXGACU5rW3TMJvMgaVLLKU4qUXa6MUErqi22nh2lslsjsmdBodbRcVmtjbUmWnFFKmyUxESkEZTbUGeFWT+PgCP7uZXActL76zO2sS0HUPN5Vn2V7t9449/Ko6bFacH8P3/yPI3CpL8vYu3doN9YUoVmA9oHspnUgT8TrMVHjUOqKSUAJPvE2yk7gDKhF5kWqTHNENBKUhvtWTJClAgSIuLg759miMRjysoTlTkT7RVqEiYSkHVX0m1TqmnEi22qYH+xdUhbaoUomQbG9osb27hrU+GalSVFq4TGaEwTx3Em3du33Z0TcH7UtHtAwsCZyg2IvpefMVtltJ5CuXVap4pbXzau/xBOK6oywwedBKyoH3QZsJuZ0EgAeVF7OSeouBBEJlMHX3vXwijukCkJw7pUYGQiRY3ECDxkigVv52kZDIA4WjfVSyyyY79/yqiafYk6HAnFJCUWTfWbaEnkK9Gmst/w/wpDa3FC6lEA8hWor0X8Pg4493lmHr5p5Nq7cHA0tJXV3nEAbFcDjKm7yntJB1jeNB+jUZFC4RZbcS5c7oKiezv1PCrTaDQBzC6VXBqJN9Sm25hOsZWjiLd4uK8twGFUttZC7JUewbSAePhv4V7BWJ29s4MvkpR2HQoyDACtSDbW58O6uDVwa+qJoaLO0tnvZQ4DaJeS1h0nIgKAAsoDMbncAbm99K0nRnZTfV51EQVEthQEp4SJnS5I0k1ksFhlNFRTBSrML7u0IGkTae4g1q9i4tKkIKjoI7uNt1zXDny7KaRoTjuh9JLtfBJR2RZIgkptO898Xiq91jIlQXfrVEniIFuBmybadscZNljsTJFiUjQiRMcxfyqgGIQCXC71jhXOQqJAuPtHWQO1edLRUIrdGTXwVwnJVuLdCEPLTmNosJymbC4PLnajGw00QjKkXtNUzG12Vug5YUR7Ri3f41ZP7PSsdapRkAxHdurOyp2lO0v7nbxXUr+m2MCkllBCswuJ3SIjdO+OVY/YqHW1lIIKdDIkA3KZtYzv8KLxuZ10Nt6pCd2ioFz361ZsbPyIDa8ySZzSbG+8EfnWrhjHDh2eTmq52uxX/ALv6xCipyTmggykWjQaRceVG9HdkIW+CkAJSSTvEQQCm/lwPdRC1pICbFSRlEgTAECeI+YBuaLwGLGVR0UTN0wDrly7iJ3HdFQyZJ7Ht4/sWRjHuXHWMkdVIB3RuA+lUG1Q5lW2CMyO0IkGIkTIgxrYzyp2FxQIUpYBIOoGk6J76qX8WSsqJI3ayTug8fzrmwYZRk/8AeSnVamGKr7lv0cWDiABCD1ZlPvZs0kk+HrWmD/aIVpqDWPwJCnM65ChfMmxG615Mxxp7rroUpaXV9WmYCoUq+kEjXSlqdOsmTh9u5ZikpxTXfwXHSx5P7O5NgYHrVV0dxKltdVYQLEm6tYyjvpf3a682kuqMgyJG7uECtD0I2N/FLihZsAJnfwPzqWHCtqwp22xymoJzfRI2OzMP1bSG+AE9+p9aJptKTXp4QUIqK6Lg83OTlJyfcUClpOsSkFajAHHnXVIiZFvZS7lWJdPcUfy1odigdX1CnCsicilQD3WAFZp3GKuQjtd025xafGoRi3goEWNoFxf/ABRUOS9xTRpnUFJg0PjcKlxBQrQ7xqDxHOjsBiRiWs0ZXE2UnnxHEVCpMUSipKmVxbi7XVHmO3dkutq6tRsCShYABXm4kCTEDuqLYiQHEzJR7wBVebSSLgJVXpWPwaHUFCxI9QeI51gds7Kdw5c7RKTdBg9pBnOJFpEgwdwJ3Vl5sMoS8rsbOHVxljfZ1yv7o7aj77gTqWzABknXcVH5+ND4zAstkJ6xCz73VyrLx3QSBe3Cq5/aSshTmmbAaePL/eqhLzji0toMkmIOk9/GqoY5SVs4s73SjsbfsW7ykogAgFQGZUAwDBIFieGl7UVsJnEOryNuKKFGFTOUT2QdOzBjfQB2Q8oqS4tKIGgBudwmr7o06GZEnQBUwNBoBwG80/oaq7+52445eW1XsaHB7EawgKQMytSo3USRcnny5cKXHALRAEn9fqaixO0AsCNTrJ9o8QNQI/3pC+AncLePjxrjyt72r4JQi0k31Mxt/AhnEIV1YcAMqSZt2ZE3gga/lUra+s7KlBCcoUIIg6AQmJVb0AovaeMzFJgT2oIiZgJhRPEHfrHjVctuBKEjtbwTCTAtawBPdpzrocrS+xck1F+QXGYhttOQdpRv48/pUBS2UIUB25hQM5pA9EzwozAbOK5gZY946zNwPCmYtjqpUklcBQEj3rZld1wJO+nGS/pT5M2GPJmk3JUn56/BUY7GLzAXSLGOMiQfIitZsHM6lOZAiZkak6CeA5eNUeKYDiUOFJCxdRiQRr4mTWq6BY8l0ktZwSo9mwk/5bnTTuqWRxcV27M1njlHG2l0+C4Rh7XFWGwMKS51gslNvvHh8/KlweFW6oqUClG/cVch9avEJCQEgQBT0mk35FkfRdOzZlajUNRcO76+w8muSJNMoHpHtZOFak3cVZCd/fE6CtszKM1/xJ2yuU4Vkjs9pwxm+6mPXyrqyyW5WpZcUSoknMm8nWd1JSsvUVRucTtHDJulsrPBLVx4kCh8VtdBSR1DwHEDLHCIVRz2ywqSoeJI85FDDYzQsY7W4rifW9ISZS4HHvIcDrYXI+2oX45r6fq1bzCvoxCMyYDgHaTIMHwrPu7IaTHZQPECnMNttrCm3EJINoWL8jxp2EqZbrQQYNQY3CNuJyuJzDhR+HxjboAUUhfEEEGm4jDKT3cajKCkqkrRWpSi7XDPPukXQokEswU65CL+HHurHjZ6mSQsHMN5Ghr2sUNtDZzLwhxAVz3+dck9NL/o/h/uamk18YP/AJI37rqed7KfQUKKwoqJmZMBMe8dY1m1F4FPWJJbcS24JSEke2nX249qR70br7qunuiITPVrsRGVX1FU20ej+JQrMlCjOuXtAnjAuKzpY5xfMWv0LtVljk5wSX6Mp28C+2ouhSikiBM5ZHoY4c6ZtPaDqW1E6iPZ4b+YoxaFoCg4haI3wY3jdB9KHxDpSmfbO4JvJ58BUU22tyTOfF/MR682FftKEpScojIDIMkGxtG+hU7ZQVFASSmYIFp4mo5UpCkNsOZlg5vsgkEGBuEaC1S7I6J4kkHqleNvWprFGnfLNnGlVyaS92RspfCYSvKFrJAFyEk8d1qnxeEHV5E5lE6wrfFgTwJ8602y+hzgVmcWBujWPlWn2dshlr2Uyr7Srn8qnDT5pytKl78f5OXPqtPif0u37GZ2FsF1TaUlIQn3lKuSDuAtWt2Xs9tlGRtIA3nee+iZria0cGkhj56vyZGp1uTNx0XhDprq5tBNA7b201hhHtukWSPieArqONWwjamORh2y4u53JGpNea47bxecK1AlW6RYCdBemYvbjrrhWtYngE2SOV6AxKApRMqkjUDKPLUioN2Xwgl1LEbVyiQkC+pPnaa6gGMPbtCTumYjyrqjyWcHqHUAi6CAOI+V6DdYRmEovwAGnGjmy4nVHw085qTKR7uvCplBWFDc3bP+E8Y3ClxK0gABKtdMpNt94ij3GgblM+H5UM5h50QR5j8qBoDCEzJRlHEie+LVYYLa2RMKUFp52IFCLQoAkZp4X+tQqxSQYWladDqQDQNqzQtLZdu2sTwmkcwyk7qzDuPakdtc/evrerTA7XUBZecTofhuM6UEHBroHwa6om9tsqOVaSlXK486KbcYX7Lg7jQRaZHFJ1aeA8qK/ZeCgfGk/ZVcqNq7gpNEAFLNTfsyqX9n4kU0h2yCup7imk+04keNB4nbeHbEgKX3AmnYqbC0oJ0rsW600krcWEgcTWV2n0nxKwUtIQ2DoSoEx8PjWXxOz33TndWFKJ95Z04ADT0pWSUPJo9r9OkkltgQNM5IHkL+tZl7aGeTmvJnt3PjUSNikadXrNz8h50T+zOpOVOQC0HIVepqJakl0ImFtwSqbc1GNbmJqNa+0opQtU9/DmkfGiSh4EdtJSb6fEUZhWRZRUk8CVRHH3p5VEkkAnCPKAyiOMp1PGOfdS1Zl5wAZVpym+ij8yKWgdM3DqOfpUTiT9oxyqVLQ923db5UjhVpOnOpWVURG0dsAbp4+dctZmy0+NctsnvnjPpQ7uHXwT4ZfpRYUEdvinwPluqN1SwLgHxHGhkMqnU3nWPGITUgSRe/r9YotD2jgpX2BB7jPdemrIJ7TcdyZ+GlQONgmyVCdYURfwohCVD7UD+8dOdqLCiPFowwEqtvvI+P6tQqEMKEpMjkq/5bvKjUtLCiQTB5zbx3VKgkapSR9wfWgCrQyNylgTYhUd/lU9kpkOOk8lW5mrJ1WYQEhJ4hIt6Uh0ghJP3YoEVOKcIH9Osc5qvxSCR2nXTPC/hWhSmQR1aeEwNe6KGUykEyOe8geG4Xp8AZpjBiey4sTvVlnh7w1+tEs4BM5usVPcPpxq6UwCiB1Xnv1ihipATfqraSRA9LXpMkDq2aCc89oH2gAJF/A8KnXsxCrhQneO7hFI06iJ/hmCbyL+gndUzbzRPsoUTG8UWG1lWlloL6tefMLkAKI5GeFEdQi2USbRMaeJvVitTRsUJUdO1lI9TTSsD+rKeaVJAjz+VFoKZGwy2nVSd1rfT9TSPFSboaCh+Eepoo4kpBKgkcJUD86el0Ee0k7zAJ+fypkaaKtvGYg3ThFnXRaRw4mK6rJltcSgphVyQkT4zE99dSCzOK6VYgf7Ckb6aPAwpM+H51pxsZrclm/FJ/mofEdG21WyNDmnMD/mFHHgnb8lSjpwke03/7R9alHTjDb24/D576XE9DALwI3zMeipNDf8ptn7PgVfzUrQJN+AtHTLBHWB3hQ+VTt9KcCdHAPxj61SudDGiT28o4JjXxSaQ9CMOLdaud3sn/AEUXEdM0rfSHBHR8Dl1ifrRLe3MKdH0f9xP1rF/8l4eJLi++BaPwi1C4vonhgDDpmdDHyv5xR9Itkj0H944Y3Dw8Fj61xxDR0dHnXmjvRFi8PpMR7vnBzX1qBzogkGA8D3I8oIUQR5UcAoSPUgsf2gPhTkrG5ST5V4/iOja0qypcRylSh/pt+dNb6Pvz2XUAzEdYqZ8E0ceQ2vwevqzGbd0E/KoW2AP7U97ijXl2H2FjCQEuqBO8OLt3xRY2BtRJhLzh7nj81UfIV7HpIajcT95RNI4wkzIB3aW8pvXmy9lbYT/WOnudT811AtO2G9V4geM/M0V7j4PTmsHGg5WEek2p5YO8A/rvrycbX2okx1rv+EH5GimNv7VgQ6TM2KEzbWezbxooD04NKGiBz1+tIWlfZ+IrzxfSHbCNQT3tfQUw9KtrD3P/AIVfGKNoz0NbSvskd00pbg5ggFURJnThp6V5z/zdtQapH/aNOHTTaP8AZoP4F/JdLYxWegHBhRJLacx1IBv325CkrAjptj1eywnwS4fH29K6jawtHp4dXeY9P5qYpRBg5b/3fPfUbmEZI3cTEg24cKfKQLeRJPyqREUqUPdBvwMfCouuyky2kj0+FOW4kWUr9afZAFMUZgdYb2hMEDgZIpAJ1qO1LQMGBeBG7wpMzUCW2yoyZJ58Y1p6G1f2itb2Rw3wKettXNXeBr4UDsGaew4UUrbbSdwCt3ikU5rENTYyJgdrfe1geFOxgUBF9RJySOPyoFTLiSYQFAmeehtERxPiKdBZK/iWtcwE/wB892mWh17RaTAlsW94k/AVMguAAhsN+6ARJNwLAT2bC26aiSvEGyWxIMlRSBeL8yrfNKhqQJ+8WfaUG7E6Zr6a8NPhU+Fx7ACpbA4yDw0VKOG6pHce52rOkiQYaUeMj2SDQ420ohSQ06CRF2VpiAbmQANeUxSpDtkze0GVR/DZP4Bfj7ul6UYlAVZhuYvASLeAmL1E1jHiZKNSomUERdOVJOe6Y1G/lFSnFA5ICSUxN9IgcTA7OnM0C+AcbUZFlNjXUOCPAFcxbTlROG2ohZlKV8IC7CI5n9ChjiFD2Qowd6io6gzGWZ3TwqVtlxZClh0AbwQNwvcTx8zRyPgtELAF0rAMayrXdYWilX1SoKspA0zImPP6VVPGDHWvJ0IKssfET+YohhZACuszGBciLW5z50rDaEnBYY6oaIGgCQL7qhVsjCaqaRfhPyqB3aBsRlVumSm3EwDelXi2Q3nUoJ7lq/lF+XKge1jDs7AAyEqB5KdH619aa9gMLk7TjiBeczigCPxRah3l9amG1NqQn2VKcVmBjtJyo7Z1Ai3yqYdGy4hKlKcBi4m3hmi00Bwu5GxhdniwW2o7/wCKk9w15bq6onejIVIKjM8BPhCx8a6gOPJpsQgcIuNLfCm4fCotY68T9a6uporOXg0HUHTcpQ3cjVXsvBIJkgnvUqPKYrq6pE10JsS0AABIk8Ty507D4dBUbaczyrq6gOw5eHQQFFIJA1PhTcEyjXKntET2Rew5V1dQLsC4g9o2FsvujieXIeVEkwo2T7GuUTpxiaWuoDwNxXYnLa/fu50A8nMELKlZsw0WoDTgDHpXV1QZYiXCqIWO0rT7R+tPxeKWHMoUYjffdxN66upoT6goxi84HZ0J9lP0o9h0qyghJlKfdTx7q6uqaIPoGIZSVHsi1/j9KgxGFQlPZBTfQEgb9wMUldUZDj1K/Y+KWQuVEwSL+P0q19xKt8H4cNK6uqK6kpdALoK6XutU5CiFkAwBuGsAT41evYdA90V1dU+xU/6mCsYJsi6AbfMV1dXUiZ//2Q==',
        recipeName: 'Kadhai Paneer',
        recipeDesc:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laboriosam quae quis, ea quidem architecto mollitia iure quo! Labore asperiores illum molestias!',
        Ingredients:['Paneer','Capcicum','Onion']
    },
    {
        recipeImg: 'https://i0.wp.com/swadisht.life/en/wp-content/uploads/2023/02/Paneer-Do-Pyaza-Recipe.jpg',
        recipeName: 'Paneer Do Pyaza',
        recipeDesc:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laboriosam quae quis, ea quidem architecto mollitia iure quo! Labore asperiores illum molestias!',
        Ingredients:['Paneer','Onion']
    },
    {
        recipeImg: 'https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg',
        recipeName: 'Chicken Biryani',
        recipeDesc:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laboriosam quae quis, ea quidem architecto mollitia iure quo! Labore asperiores illum molestias!',
        Ingredients:['Chicken', 'Rice','Onion','Garlic']
    }
]

async function seedDB(){
    await Recipe.deleteMany({});
    await Recipe.insertMany(oldRecipes);
    console.log('DB seeded!');
}
seedDB();

