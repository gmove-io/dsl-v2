import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_1735f24294e55a988541e97db050903cf8a70ce38c77ad219c134344eda67ac from "../_dependencies/source/0x1735f24294e55a988541e97db050903cf8a70ce38c77ad219c134344eda67ac/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_4b4ebbcaeead1d059a4b8bc4e8d532e9470d4d514e2539c6350b2b11c22b6aa from "../_dependencies/source/0x4b4ebbcaeead1d059a4b8bc4e8d532e9470d4d514e2539c6350b2b11c22b6aa/init";
import * as package_557ec0426a2c803b3769f152c12ad9ad0b2cecc4e6cd2716be055ad4cc9df29f from "../_dependencies/source/0x557ec0426a2c803b3769f152c12ad9ad0b2cecc4e6cd2716be055ad4cc9df29f/init";
import * as package_7a77b4695a59078fda0c6109737bf7b72a7a7315ff42edfc0eea772c2dce341e from "../_dependencies/source/0x7a77b4695a59078fda0c6109737bf7b72a7a7315ff42edfc0eea772c2dce341e/init";
import * as package_8b111cb401053b3b61ef37832cc16d0784a77c2c1058014ff7057ec4cf6f8932 from "../_dependencies/source/0x8b111cb401053b3b61ef37832cc16d0784a77c2c1058014ff7057ec4cf6f8932/init";
import * as package_8c19460961af40edf348433cd41547f63e306e4b5c1a0ae9269364bd9fcbb5a6 from "../_dependencies/source/0x8c19460961af40edf348433cd41547f63e306e4b5c1a0ae9269364bd9fcbb5a6/init";
import * as package_941e0a5b9ea70064b1d8649229ceb3216e0ef36802320f50b4b00bd9178b8073 from "../_dependencies/source/0x941e0a5b9ea70064b1d8649229ceb3216e0ef36802320f50b4b00bd9178b8073/init";
import * as package_a9f9979daa9f68b6cf7da422fa5590e09773409effdf3d02079d5595f101b9a9 from "../_dependencies/source/0xa9f9979daa9f68b6cf7da422fa5590e09773409effdf3d02079d5595f101b9a9/init";
import * as package_af6ff929224de84ca0372eceef9a1c891bae68d03427bfcf5e99458a2c1498a1 from "../_dependencies/source/0xaf6ff929224de84ca0372eceef9a1c891bae68d03427bfcf5e99458a2c1498a1/init";
import * as package_cdbd730f422a89174ee4717e97a3db1c48b008f969eec00846a0d685b2437f8a from "../_dependencies/source/0xcdbd730f422a89174ee4717e97a3db1c48b008f969eec00846a0d685b2437f8a/init";
import * as package_d0a449fc6b27195df90aff0076cdd84dd43f600235b23144f2422741b1bb86a8 from "../_dependencies/source/0xd0a449fc6b27195df90aff0076cdd84dd43f600235b23144f2422741b1bb86a8/init";
import * as package_7ff57beccfa2c8664643da447f82a55a84735b356eea28180ff794567211b030 from "../desuilabs/init";
import {structClassLoaderSource as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return }; initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_1735f24294e55a988541e97db050903cf8a70ce38c77ad219c134344eda67ac.registerClasses(structClassLoader);
package_4b4ebbcaeead1d059a4b8bc4e8d532e9470d4d514e2539c6350b2b11c22b6aa.registerClasses(structClassLoader);
package_557ec0426a2c803b3769f152c12ad9ad0b2cecc4e6cd2716be055ad4cc9df29f.registerClasses(structClassLoader);
package_7a77b4695a59078fda0c6109737bf7b72a7a7315ff42edfc0eea772c2dce341e.registerClasses(structClassLoader);
package_7ff57beccfa2c8664643da447f82a55a84735b356eea28180ff794567211b030.registerClasses(structClassLoader);
package_8b111cb401053b3b61ef37832cc16d0784a77c2c1058014ff7057ec4cf6f8932.registerClasses(structClassLoader);
package_8c19460961af40edf348433cd41547f63e306e4b5c1a0ae9269364bd9fcbb5a6.registerClasses(structClassLoader);
package_941e0a5b9ea70064b1d8649229ceb3216e0ef36802320f50b4b00bd9178b8073.registerClasses(structClassLoader);
package_a9f9979daa9f68b6cf7da422fa5590e09773409effdf3d02079d5595f101b9a9.registerClasses(structClassLoader);
package_af6ff929224de84ca0372eceef9a1c891bae68d03427bfcf5e99458a2c1498a1.registerClasses(structClassLoader);
package_cdbd730f422a89174ee4717e97a3db1c48b008f969eec00846a0d685b2437f8a.registerClasses(structClassLoader);
package_d0a449fc6b27195df90aff0076cdd84dd43f600235b23144f2422741b1bb86a8.registerClasses(structClassLoader);
 }
