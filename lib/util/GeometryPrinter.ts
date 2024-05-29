import type {
  CircularString,
  CompoundCurve,
  Curve,
  CurvePolygon,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  PolyhedralSurface,
  TIN,
  Triangle,
} from "../internal.ts";
import { GeometryType } from "../internal.ts";

/**
 * String representation of a Geometry
 */
export class GeometryPrinter {
  /**
   * Get Geometry Information as a String
   * @param geometry geometry
   * @return geometry String
   */
  public static getGeometryString(
    geometry: Geometry,
  ): string {
    const message: string[] = [];
    const geometryType: GeometryType = geometry.geometryType;
    switch (geometryType) {
      case GeometryType.Point: {
        GeometryPrinter.addPointMessage(message, geometry as Point);
        break;
      }
      case GeometryType.LineString: {
        GeometryPrinter.addLineStringMessage(message, geometry as LineString);
        break;
      }
      case GeometryType.Polygon: {
        GeometryPrinter.addPolygonMessage(message, geometry as Polygon);
        break;
      }
      case GeometryType.MultiPoint: {
        GeometryPrinter.addMultiPointMessage(message, geometry as MultiPoint);
        break;
      }
      case GeometryType.MultiLineString: {
        GeometryPrinter.addMultiLineStringMessage(
          message,
          geometry as MultiLineString,
        );
        break;
      }
      case GeometryType.MultiPolygon: {
        GeometryPrinter.addMultiPolygonMessage(
          message,
          geometry as MultiPolygon,
        );
        break;
      }
      case GeometryType.CircularString: {
        GeometryPrinter.addLineStringMessage(
          message,
          geometry as CircularString,
        );
        break;
      }
      case GeometryType.CompoundCurve: {
        GeometryPrinter.addCompoundCurveMessage(
          message,
          geometry as CompoundCurve,
        );
        break;
      }
      case GeometryType.CurvePolygon: {
        GeometryPrinter.addCurvePolygonMessage(
          message,
          geometry as CurvePolygon,
        );
        break;
      }
      case GeometryType.PolyhedralSurface: {
        GeometryPrinter.addPolyhedralSurfaceMessage(
          message,
          geometry as PolyhedralSurface,
        );
        break;
      }
      case GeometryType.Tin: {
        GeometryPrinter.addPolyhedralSurfaceMessage(message, geometry as TIN);
        break;
      }
      case GeometryType.Triangle: {
        GeometryPrinter.addPolygonMessage(message, geometry as Triangle);
        break;
      }
      case GeometryType.GeometryCollection:
      case GeometryType.MultiCurve:
      case GeometryType.MultiSurface: {
        const geomCollection = geometry as GeometryCollection;
        message.push(`Geometries: ${geomCollection.numGeometries()}`);
        const geometries = geomCollection.geometries;
        for (let i = 0; i < geometries.length; i++) {
          const subGeometry = geometries[i];
          message.push("\n\n");
          message.push(`Geometry ${i + 1}`);
          message.push("\n");
          message.push(GeometryType.nameFromType(subGeometry.geometryType));
          message.push("\n");
          message.push(GeometryPrinter.getGeometryString(subGeometry));
        }
        break;
      }
      default:
    }

    return message.join("");
  }

  /**
   * Add Point message
   * @param message string message
   * @param point point
   */
  private static addPointMessage(message: string[], point: Point): void {
    message.push("Latitude: ");
    message.push(point.y.toString());
    message.push("\nLongitude: ");
    message.push(point.x.toString());
  }

  /**
   * Add MultiPoint message
   * @param message string message
   * @param multiPoint multi point
   */
  private static addMultiPointMessage(
    message: string[],
    multiPoint: MultiPoint,
  ): void {
    message.push(`Points: ${multiPoint.numPoints()}`);
    const points = multiPoint.points;
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      message.push("\n\n");
      message.push(`Point ${i + 1}`);
      message.push("\n");
      GeometryPrinter.addPointMessage(message, point);
    }
  }

  /**
   * Add LineString message
   * @param message string message
   * @param lineString line string
   */
  private static addLineStringMessage(
    message: string[],
    lineString: LineString,
  ): void {
    message.push(`Points: ${lineString.numPoints()}`);
    for (const point of lineString.points) {
      message.push("\n\n");
      GeometryPrinter.addPointMessage(message, point);
    }
  }

  /**
   * Add MultiLineString message
   * @param message string message
   * @param multiLineString  multi line string
   */
  private static addMultiLineStringMessage(
    message: string[],
    multiLineString: MultiLineString,
  ): void {
    message.push(`LineStrings: ${multiLineString.numLineStrings()}`);
    const lineStrings = multiLineString.lineStrings;
    for (let i = 0; i < lineStrings.length; i++) {
      const lineString = lineStrings[i];
      message.push("\n\n");
      message.push(`LineString ${i + 1}`);
      message.push("\n");
      GeometryPrinter.addLineStringMessage(message, lineString);
    }
  }

  /**
   * Add Polygon message
   * @param message string message
   * @param polygon polygon
   */
  private static addPolygonMessage(message: string[], polygon: Polygon): void {
    message.push(`Rings: ${polygon.numRings()}`);
    const rings = polygon.rings;
    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      message.push("\n\n");
      if (i > 0) {
        message.push(`Hole ${i}`);
        message.push("\n");
      }
      GeometryPrinter.addLineStringMessage(message, ring);
    }
  }

  /**
   * Add MultiPolygon message
   * @param message string message
   * @param multiPolygon multi polygon
   */
  private static addMultiPolygonMessage(
    message: string[],
    multiPolygon: MultiPolygon,
  ): void {
    message.push(`Polygons: ${multiPolygon.numPolygons()}`);
    const polygons = multiPolygon.polygons;
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      message.push("\n\n");
      message.push(`Polygon ${i + 1}`);
      message.push("\n");
      GeometryPrinter.addPolygonMessage(message, polygon);
    }
  }

  /**
   * Add CompoundCurve message
   * @param message string message
   * @param compoundCurve compound curve
   */
  private static addCompoundCurveMessage(
    message: string[],
    compoundCurve: CompoundCurve,
  ): void {
    message.push(`LineStrings: ${compoundCurve.numLineStrings()}`);
    const lineStrings = compoundCurve.lineStrings;
    for (let i = 0; i < lineStrings.length; i++) {
      const lineString = lineStrings[i];
      message.push("\n\n");
      message.push(`LineString ${i + 1}`);
      message.push("\n");
      GeometryPrinter.addLineStringMessage(message, lineString);
    }
  }

  /**
   * Add CurvePolygon message
   * @param message string message
   * @param curvePolygon curve polygon
   */
  private static addCurvePolygonMessage(
    message: string[],
    curvePolygon: CurvePolygon,
  ): void {
    message.push(`Rings: ${curvePolygon.numRings()}`);
    const rings = curvePolygon.rings;
    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      message.push("\n\n");
      if (i > 0) {
        message.push(`Hole ${i}`);
        message.push("\n");
      }
      message.push(GeometryPrinter.getGeometryString(ring));
    }
  }

  /**
   * Add PolyhedralSurface message
   * @param message string message
   * @param polyhedralSurface polyhedral surface
   */
  private static addPolyhedralSurfaceMessage(
    message: string[],
    polyhedralSurface: PolyhedralSurface,
  ): void {
    message.push(`Polygons: ${polyhedralSurface.numPolygons()}`);
    const polygons = polyhedralSurface.polygons;
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      message.push("\n\n");
      message.push(`Polygon ${i + 1}`);
      message.push("\n");
      GeometryPrinter.addPolygonMessage(message, polygon);
    }
  }
}
