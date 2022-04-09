// Code from https://github.com/Valve/fingerprintjs2
// Reworked to match coding style

export const getWebGLData = () => {
  const maxAnisotropy = (gl) => {
    let anisotropy
    const ext =
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
    // eslint-disable-next-line no-return-assign
    return ext
      ? ((anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),
        anisotropy === 0 && (anisotropy = 2),
        anisotropy)
      : null
  }
  let webGLVendor = null
  let webGLRenderer = null
  let webGLData = null
  let webGLParameters = null

  const fa2s = (fa, gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    return '[' + fa[0] + ', ' + fa[1] + ']'
  }

  const getGeneralParameters = (webGLParameters, gl) => {
    const fa2sParameters = [
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'MAX_VIEWPORT_DIMS',
    ]
    const generalParameterNames = [
      'ALPHA_BITS',
      'BLUE_BITS',
      'DEPTH_BITS',
      'GREEN_BITS',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'RED_BITS',
      'RENDERER',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BITS',
      'VENDOR',
      'VERSION',
    ]
    const generalParameters = {}

    try {
      generalParameters.MAX_ANISOTROPY = maxAnisotropy(gl)
      generalParameters.ANTIALIAS = gl.getContextAttributes().antialias
        ? 'yes'
        : 'no'
      fa2sParameters.forEach(function (fa2sParameter) {
        generalParameters[fa2sParameter] = fa2s(
          gl.getParameter(gl[fa2sParameter]),
          gl
        )
      })
      generalParameterNames.forEach(function (generalParameterName) {
        generalParameters[generalParameterName] = gl.getParameter(
          gl[generalParameterName]
        )
      })

      return generalParameters
    } catch (e) {
      return null
    }
  }

  const getShaderPrecisionParameters = (webGLParameters, gl) => {
    const shadersTypes = ['VERTEX_SHADER', 'FRAGMENT_SHADER']
    const numberTypes = [
      'HIGH_FLOAT',
      'MEDIUM_FLOAT',
      'LOW_FLOAT',
      'HIGH_INT',
      'MEDIUM_INT',
      'LOW_INT',
    ]
    const parameters = ['precision', 'rangeMin', 'rangeMax']
    const shadersPrecisionParameters = {}

    try {
      shadersTypes.forEach(function (shaderType) {
        numberTypes.forEach(function (numberType) {
          parameters.forEach(function (parameter) {
            const fullName = shaderType + ' ' + numberType + ' ' + parameter
            shadersPrecisionParameters[fullName] = gl.getShaderPrecisionFormat(
              gl[shaderType],
              gl[numberType]
            )[parameter]
          })
        })
      })

      return shadersPrecisionParameters
    } catch (e) {
      return null
    }
  }

  const generateWebGLData = (gl) => {
    try {
      const vShaderTemplate =
        'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
      const fShaderTemplate =
        'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
      const vertexPosBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
      const vertices = new Float32Array([
        -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
      ])
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
      vertexPosBuffer.itemSize = 3
      vertexPosBuffer.numItems = 3
      const program = gl.createProgram()
      const vshader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vshader, vShaderTemplate)
      gl.compileShader(vshader)
      const fshader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fshader, fShaderTemplate)
      gl.compileShader(fshader)
      gl.attachShader(program, vshader)
      gl.attachShader(program, fshader)
      gl.linkProgram(program)
      gl.useProgram(program)
      program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
      program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
      gl.enableVertexAttribArray(program.vertexPosArray)
      gl.vertexAttribPointer(
        program.vertexPosAttrib,
        vertexPosBuffer.itemSize,
        gl.FLOAT,
        !1,
        0,
        0
      )
      gl.uniform2f(program.offsetUniform, 1, 1)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)

      if (gl.canvas != null) {
        return gl.canvas.toDataURL()
      }
    } catch (e) {
      return null
    }
  }

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (gl.getSupportedExtensions().includes('WEBGL_debug_renderer_info')) {
      try {
        webGLVendor = gl.getParameter(
          gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL
        )
      } catch (e) {
        webGLVendor = null
      }

      try {
        webGLRenderer = gl.getParameter(
          gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL
        )
      } catch (e) {
        webGLRenderer = null
      }

      webGLData = generateWebGLData(gl)
      webGLParameters = {}
      webGLParameters.extensions = gl.getSupportedExtensions()
      webGLParameters.general = getGeneralParameters(webGLParameters, gl)
      webGLParameters.shaderPrecision = getShaderPrecisionParameters(
        webGLParameters,
        gl
      )
    } else {
      webGLVendor = null
      webGLRenderer = null
      webGLParameters = null
      webGLData = null
    }
  } catch (e) {
    webGLVendor = null
    webGLRenderer = null
    webGLParameters = null
    webGLData = null
  }

  return {
    webGLVendor,
    webGLRenderer,
    webGLData,
    webGLParameters,
  }
}
